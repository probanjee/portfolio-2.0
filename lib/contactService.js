import nodemailer from 'nodemailer';

export const DEFAULT_RECIPIENT = 'prosunbanerjee8@gmail.com';
export const DEFAULT_RESEND_FROM = 'onboarding@resend.dev';
const RESEND_API_URL = 'https://api.resend.com/emails';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLACEHOLDER_PASSWORDS = new Set(['your-16-char-gmail-app-password']);
const PLACEHOLDER_RESEND_KEYS = new Set(['re_your_resend_api_key', 'your-resend-api-key']);

export const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const validateContactPayload = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, status: 400, message: 'Invalid request body.' };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > 120 || /[\r\n]/.test(name)) {
    return { ok: false, status: 400, message: 'Name is required and must be 120 characters or fewer.' };
  }
  if (!email || email.length > 254 || /[\r\n]/.test(email) || !EMAIL_REGEX.test(email)) {
    return { ok: false, status: 400, message: 'Enter a valid email address.' };
  }
  if (subject.length > 160 || /[\r\n]/.test(subject)) {
    return { ok: false, status: 400, message: 'Subject must be 160 characters or fewer.' };
  }
  if (message.length < 5 || message.length > 5000) {
    return { ok: false, status: 400, message: 'Message must be between 5 and 5000 characters.' };
  }

  return {
    ok: true,
    data: { name, email, subject, message },
  };
};

export const getMailConfig = (env = process.env) => {
  const to = (env.EMAIL_TO || DEFAULT_RECIPIENT).trim();
  const resendApiKey = (env.RESEND_API_KEY || '').trim();

  if (resendApiKey && !PLACEHOLDER_RESEND_KEYS.has(resendApiKey.toLowerCase())) {
    const from = (env.RESEND_FROM || DEFAULT_RESEND_FROM).trim();
    return { provider: 'resend', apiKey: resendApiKey, from, to };
  }

  const user = (env.EMAIL_USER || '').trim();
  // Gmail App Passwords are often copied as 4x4 groups separated by spaces.
  const pass = (env.EMAIL_PASS || '').replace(/\s+/g, '').trim();
  const host = (env.SMTP_HOST || '').trim();
  const port = env.SMTP_PORT ? Number(env.SMTP_PORT) : undefined;

  if (!user || !pass || PLACEHOLDER_PASSWORDS.has(pass.toLowerCase())) return null;

  return { provider: 'smtp', user, pass, to, host, port };
};

export const createMailTransporter = (config, transportFactory = nodemailer.createTransport) => {
  const baseOptions = config.host
    ? {
        host: config.host,
        port: config.port || 465,
        secure: (config.port || 465) === 465,
      }
    : {
        service: 'gmail',
      };

  return transportFactory({
    ...baseOptions,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
};

export const buildContactEmail = ({ name, email, subject, message }, config) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const timestamp = new Date().toISOString();
  const cleanDisplayName = name.replace(/["<>\\]/g, '').trim() || 'Portfolio Visitor';
  const senderAddress = config.provider === 'resend' ? (config.from || DEFAULT_RESEND_FROM) : config.user;

  return {
    from: `"${cleanDisplayName} (Portfolio)" <${senderAddress}>`,
    to: config.to,
    replyTo: `${cleanDisplayName} <${email}>`,
    subject: `Portfolio Contact - ${subject || `New message from ${name}`}`,
    text: [
      'New Portfolio Contact Submission',
      '',
      `Date & Time (UTC): ${timestamp}`,
      `Sender Name: ${name}`,
      `Sender Email: ${email}`,
      `Subject: ${subject || 'N/A'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; line-height: 1.6;">
        <h2 style="margin-bottom: 16px; color: #1d4ed8;">New Portfolio Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <tr><td style="padding: 10px 14px; font-weight: 600; width: 130px; color: #475569;">From</td><td style="padding: 10px 14px;">${safeName} &lt;${safeEmail}&gt;</td></tr>
          <tr><td style="padding: 10px 14px; font-weight: 600; color: #475569;">Subject</td><td style="padding: 10px 14px;">${safeSubject || 'N/A'}</td></tr>
          <tr><td style="padding: 10px 14px; font-weight: 600; color: #475569;">Timestamp</td><td style="padding: 10px 14px;">${escapeHtml(timestamp)}</td></tr>
        </table>
        <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="font-weight: 600; color: #475569; margin-bottom: 8px;">Message</div>
          <div>${safeMessage}</div>
        </div>
      </div>
    `,
  };
};

const deliverViaResend = async (mailOptions, config, fetchFn = globalThis.fetch) => {
  if (typeof fetchFn !== 'function') {
    throw new Error('Fetch API is unavailable for Resend delivery.');
  }

  const response = await fetchFn(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: mailOptions.from,
      to: [mailOptions.to],
      reply_to: mailOptions.replyTo,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    }),
    signal: typeof AbortSignal?.timeout === 'function' ? AbortSignal.timeout(15000) : undefined,
  });

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch {
      errorData = {};
    }

    const err = new Error(errorData.message || `Resend request failed with status ${response.status}.`);
    err.code = errorData.name || 'RESEND_ERROR';
    err.responseCode = response.status;
    throw err;
  }
};

export const sendContactEmail = async (payload, options = {}) => {
  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return {
      status: validation.status,
      body: { success: false, message: validation.message },
    };
  }

  const config = getMailConfig(options.env || process.env);
  if (!config) {
    console.error('Contact delivery is unavailable: RESEND_API_KEY or EMAIL_USER / EMAIL_PASS is not configured.');
    return {
      status: 503,
      body: {
        success: false,
        code: 'MAIL_NOT_CONFIGURED',
        message: 'Mail server is not configured yet (missing RESEND_API_KEY or EMAIL_USER / EMAIL_PASS).',
      },
    };
  }

  const mailOptions = buildContactEmail(validation.data, config);

  try {
    if (config.provider === 'resend') {
      await deliverViaResend(mailOptions, config, options.fetchFn);
    } else {
      const transporter = createMailTransporter(config, options.transportFactory);
      await transporter.sendMail(mailOptions);
    }

    return {
      status: 200,
      body: { success: true, message: 'Message delivered successfully.' },
    };
  } catch (error) {
    console.error('Contact delivery failed.', {
      provider: config.provider,
      code: error?.code || 'UNKNOWN',
      responseCode: error?.responseCode,
      detail: error?.message,
    });
    return {
      status: 500,
      body: {
        success: false,
        code: error?.code || 'MAIL_DELIVERY_ERROR',
        message:
          config.provider === 'resend'
            ? error?.message || 'Resend could not deliver the message. Please check your Resend configuration or use direct email.'
            : 'Message could not be sent by the mail server. Please verify SMTP credentials or use direct email.',
      },
    };
  }
};
