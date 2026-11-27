export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const DEFAULT_WEB3FORMS_ACCESS_KEY = '209ed491-edb1-43d9-905a-c2d950a80257';

const NON_RETRYABLE_API_STATUSES = new Set([400, 403, 422, 429]);

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
 * Resolves the active Web3Forms access key from Vite env or configured default.
 * @returns {string} Trimmed access key or empty string.
 */
export const getWeb3FormsAccessKey = () =>
  (import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY || '').trim();

/**
 * Submits a validated contact payload through the first-party API with
 * automatic browser fallback to Web3Forms when the API backend is unavailable.
 * @param {{ name: string, email: string, subject?: string, message: string }} payload
 * @param {{ fetchFn?: typeof fetch, web3formsKey?: string, onFallback?: (reason: string) => void }} [options]
 * @returns {Promise<{ provider: 'api' | 'web3forms', message: string }>}
 */
export const submitContactForm = async (payload, options = {}) => {
  const fetchFn = options.fetchFn || globalThis.fetch;
  const web3formsKey =
    options.web3formsKey !== undefined ? String(options.web3formsKey).trim() : getWeb3FormsAccessKey();

  let apiFailureMessage = '';

  try {
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

    if (response.ok) {
      return {
        provider: 'api',
        message: data.message || 'Message delivered successfully.',
      };
    }

    apiFailureMessage =
      data.message || data.error || `Contact service unavailable (HTTP ${response.status}).`;

    if (NON_RETRYABLE_API_STATUSES.has(response.status)) {
      throw Object.assign(new Error(apiFailureMessage), { nonRetryable: true });
    }
  } catch (error) {
    if (error?.nonRetryable) {
      throw error;
    }
    apiFailureMessage = apiFailureMessage || error?.message || 'Unable to reach /api/contact.';
  }

  if (!web3formsKey) {
    throw new Error(apiFailureMessage || 'Transmission failed. Please try again.');
  }

  options.onFallback?.('Primary API unavailable; routing via Web3Forms...');

  const web3FormData = new FormData();
  web3FormData.append('access_key', web3formsKey);
  web3FormData.append('name', payload.name);
  web3FormData.append('email', payload.email);
  web3FormData.append(
    'subject',
    payload.subject
      ? `Portfolio Contact - ${payload.subject}`
      : `Portfolio Contact from ${payload.name}`,
  );
  web3FormData.append('message', payload.message);
  web3FormData.append('from_name', `${payload.name} (Portfolio)`);
  web3FormData.append('replyto', payload.email);

  try {
    const web3Response = await fetchFn(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: web3FormData,
    });

    const web3Data = (await readJsonSafely(web3Response)) || {};
    if (web3Response.ok && web3Data.success) {
      return {
        provider: 'web3forms',
        message: web3Data.message || 'Message delivered via Web3Forms.',
      };
    }

    throw new Error(
      web3Data.message || apiFailureMessage || 'Transmission failed. Please try again.',
    );
  } catch (web3Error) {
    const fallbackDetail =
      web3Error?.message && web3Error.message !== 'Failed to fetch'
        ? web3Error.message
        : apiFailureMessage || 'Web3Forms endpoint could not be reached from this browser.';
    throw new Error(fallbackDetail);
  }
};
