import { describe, it, expect, vi } from 'vitest';
import { submitContactForm, WEB3FORMS_ENDPOINT } from '../contactClient';

const SAMPLE_PAYLOAD = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'Testing multi-provider delivery flow.',
};

describe('contactClient', () => {
  it('succeeds via /api/contact without calling Web3Forms fallback', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: true, message: 'Message delivered successfully.' }),
    });

    const result = await submitContactForm(SAMPLE_PAYLOAD, {
      fetchFn,
      web3formsKey: 'test-web3forms-key',
    });

    expect(result).toEqual({
      provider: 'api',
      message: 'Message delivered successfully.',
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(fetchFn.mock.calls[0][0]).toBe('/api/contact');
  });

  it('does not fall back when /api/contact rejects with 400 validation error', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: false, message: 'Enter a valid email address.' }),
    });

    await expect(
      submitContactForm(SAMPLE_PAYLOAD, { fetchFn, web3formsKey: 'test-web3forms-key' }),
    ).rejects.toThrow('Enter a valid email address.');
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('falls back to Web3Forms when /api/contact returns 503', async () => {
    const onFallback = vi.fn();
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: false, code: 'MAIL_NOT_CONFIGURED', message: 'Not configured' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: true, message: 'Form submitted successfully!' }),
      });

    const result = await submitContactForm(SAMPLE_PAYLOAD, {
      fetchFn,
      web3formsKey: 'test-web3forms-key',
      onFallback,
    });

    expect(result).toEqual({
      provider: 'web3forms',
      message: 'Form submitted successfully!',
    });
    expect(onFallback).toHaveBeenCalledTimes(1);
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(fetchFn.mock.calls[1][0]).toBe(WEB3FORMS_ENDPOINT);
    const web3Body = fetchFn.mock.calls[1][1].body;
    expect(web3Body).toBeInstanceOf(FormData);
    expect(web3Body.get('access_key')).toBe('test-web3forms-key');
    expect(web3Body.get('replyto')).toBe('ada@example.com');
  });

  it('surfaces meaningful context if both /api/contact and Web3Forms network fail', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ success: false, message: 'Mail server is not configured yet.' }),
      })
      .mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(
      submitContactForm(SAMPLE_PAYLOAD, {
        fetchFn,
        web3formsKey: 'test-web3forms-key',
      }),
    ).rejects.toThrow('Mail server is not configured yet.');
  });
});
