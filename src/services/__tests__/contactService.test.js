import { describe, it, expect, vi } from 'vitest';
import {
  buildContactEmail,
  getMailConfig,
  sendContactEmail,
  validateContactPayload,
} from '../../../lib/contactService';

describe('contactService', () => {
  it('validates and trims contact payload fields', () => {
    const result = validateContactPayload({
      name: '  Ada Lovelace ',
      email: ' ada@example.com ',
      subject: ' Hello ',
      message: ' Testing the contact pipeline! ',
    });

    expect(result).toEqual({
      ok: true,
      data: {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subject: 'Hello',
        message: 'Testing the contact pipeline!',
      },
    });
  });

  it('rejects newline injection and short messages', () => {
    expect(
      validateContactPayload({
        name: 'Ada\r\nBcc: evil@example.com',
        email: 'ada@example.com',
        subject: 'Hi',
        message: 'Valid message text',
      }).ok,
    ).toBe(false);

    expect(
      validateContactPayload({
        name: 'Ada',
        email: 'ada@example.com',
        subject: 'Hi',
        message: 'hey',
      }).ok,
    ).toBe(false);
  });

  it('prefers RESEND_API_KEY when present and rejects placeholders', () => {
    expect(
      getMailConfig({
        RESEND_API_KEY: ' re_test_12345 ',
        EMAIL_TO: 'owner@example.com',
      }),
    ).toEqual({
      provider: 'resend',
      apiKey: 're_test_12345',
      from: 'onboarding@resend.dev',
      to: 'owner@example.com',
    });

    expect(getMailConfig({ RESEND_API_KEY: 're_your_resend_api_key' })).toBeNull();
  });

  it('strips spaces copied in Gmail App Passwords and rejects placeholders', () => {
    const cfg = getMailConfig({
      EMAIL_USER: ' prosunbanerjee8@gmail.com ',
      EMAIL_PASS: 'abcd efgh ijkl mnop',
    });

    expect(cfg).toEqual({
      provider: 'smtp',
      user: 'prosunbanerjee8@gmail.com',
      pass: 'abcdefghijklmnop',
      to: 'prosunbanerjee8@gmail.com',
      host: '',
      port: undefined,
    });

    expect(getMailConfig({ EMAIL_USER: 'prosunbanerjee8@gmail.com', EMAIL_PASS: '' })).toBeNull();
    expect(
      getMailConfig({
        EMAIL_USER: 'prosunbanerjee8@gmail.com',
        EMAIL_PASS: 'your-16-char-gmail-app-password',
      }),
    ).toBeNull();
  });

  it('escapes HTML and sets replyTo to the visitor email', () => {
    const mail = buildContactEmail(
      {
        name: 'Visitor <script>',
        email: 'visitor@example.com',
        subject: 'Job <alert>',
        message: 'Hello\nWorld',
      },
      { provider: 'resend', from: 'onboarding@resend.dev', to: 'prosunbanerjee8@gmail.com' },
    );

    expect(mail.from).toBe('"Visitor script (Portfolio)" <onboarding@resend.dev>');
    expect(mail.to).toBe('prosunbanerjee8@gmail.com');
    expect(mail.replyTo).toBe('Visitor script <visitor@example.com>');
    expect(mail.html).toContain('&lt;script&gt;');
    expect(mail.html).toContain('Hello<br/>World');
  });

  it('returns 503 when credentials are missing and 200 for Resend or SMTP delivery', async () => {
    const missing = await sendContactEmail(
      {
        name: 'Visitor',
        email: 'visitor@example.com',
        subject: 'Hello',
        message: 'Interested in hiring you.',
      },
      { env: {} },
    );

    expect(missing.status).toBe(503);
    expect(missing.body.code).toBe('MAIL_NOT_CONFIGURED');

    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'email-123' }),
    });
    const resendDelivered = await sendContactEmail(
      {
        name: 'Visitor',
        email: 'visitor@example.com',
        subject: 'Hello',
        message: 'Testing Resend route.',
      },
      {
        env: { RESEND_API_KEY: 're_test_12345' },
        fetchFn,
      },
    );

    expect(resendDelivered.status).toBe(200);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, reqInit] = fetchFn.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(reqInit.headers.Authorization).toBe('Bearer re_test_12345');
    expect(JSON.parse(reqInit.body).reply_to).toBe('Visitor <visitor@example.com>');

    const sendMail = vi.fn().mockResolvedValue({ messageId: 'msg-1' });
    const smtpDelivered = await sendContactEmail(
      {
        name: 'Visitor',
        email: 'visitor@example.com',
        subject: 'Hello',
        message: 'Interested in hiring you.',
      },
      {
        env: { EMAIL_USER: 'prosunbanerjee8@gmail.com', EMAIL_PASS: 'abcd efgh ijkl mnop' },
        transportFactory: () => ({ sendMail }),
      },
    );

    expect(smtpDelivered.status).toBe(200);
    expect(smtpDelivered.body.success).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
});
