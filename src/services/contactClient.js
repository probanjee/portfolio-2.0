const readJsonSafely = async (response) => {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType && !contentType.includes('application/json')) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

/**
 * Submits a validated contact payload to the server-side /api/contact endpoint.
 * All mail credentials stay strictly on the server (zero keys in frontend code).
 * @param {{ name: string, email: string, subject?: string, message: string, website?: string }} payload
 * @param {{ fetchFn?: typeof fetch }} [options]
 * @returns {Promise<{ provider: 'api', message: string }>}
 */
export const submitContactForm = async (payload, options = {}) => {
  const fetchFn = options.fetchFn || globalThis.fetch;

  const response = await fetchFn('/api/contact', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'omit',
    body: JSON.stringify(payload),
  });

    const data = (await readJsonSafely(response)) || {};

    if (response.ok && data.success !== false) {
      return {
        provider: 'api',
        message: data.message || 'Message delivered successfully.',
      };
    }

  throw new Error(
          data.message || data.error || `Contact service unavailable (HTTP ${response.status}).`,
        );
  };
