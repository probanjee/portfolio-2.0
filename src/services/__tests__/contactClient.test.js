import { describe, it, expect, vi } from 'vitest';
import { submitContactForm } from '../contactClient';

const SAMPLE_PAYLOAD = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'Testing server-only contact delivery flow.',
  website: '',
};

describe('contactClient', () => {
  it('submits strictly to /api/contact with omit credentials and no exposed keys', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: true, message: 'Message delivered successfully.' }),
    });

    const result = await submitContactForm(SAMPLE_PAYLOAD, { fetchFn });

    expect(result).toEqual({
      provider: 'api',
      message: 'Message delivered successfully.',
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(fetchFn.mock.calls[0][0]).toBe('/api/contact');
    expect(fetchFn.mock.calls[0][1].credentials).toBe('omit');
  });

  it('throws the server error message when /api/contact rejects the submission', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: false, message: 'Enter a valid email address.' }),
    });

    await expect(submitContactForm(SAMPLE_PAYLOAD, { fetchFn })).rejects.toThrow(
      'Enter a valid email address.',
    );
  });

  it('surfaces a clean fallback error when the server returns non-JSON', async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      headers: new Headers({ 'content-type': 'text/plain' }),
    });

    await expect(submitContactForm(SAMPLE_PAYLOAD, { fetchFn })).rejects.toThrow(
      'Contact service unavailable (HTTP 503).',
    );
  });
});
