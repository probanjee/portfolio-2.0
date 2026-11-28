import { processContributions } from './githubService';

const FAISAL_LEETCODE_API = 'https://leetcode-api-faisalshohag.vercel.app';
const PIED_LEETCODE_API = 'https://leetcode-api-pied.vercel.app';
const TASHIF_LEETCODE_API = 'https://leetcode-stats.tashif.codes';
const ALFA_LEETCODE_API = 'https://alfa-leetcode-api.onrender.com';

const getSessionStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
  } catch {}
  return null;
};

const isHostedOrigin = () => {
  try {
    const hostname = window?.location?.hostname;
    return Boolean(hostname && hostname !== 'localhost' && hostname !== '127.0.0.1');
  } catch {
    return false;
  }
};

/**
 * Maps daily LeetCode submission count onto the 0..4 heatmap intensity scale.
 */
export const getLeetCodeLevel = (count) => {
  if (!Number.isFinite(count) || count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

/**
 * Parses LeetCode's submissionCalendar (object or serialized JSON string)
 * into a Date-string ('YYYY-MM-DD') -> submission-count Map.
 */
export const parseSubmissionCalendar = (submissionCalendar) => {
  if (!submissionCalendar) return null;

  let calendarObj = submissionCalendar;
  if (typeof submissionCalendar === 'string') {
    const trimmed = submissionCalendar.trim();
    if (!trimmed) return null;
    try {
      calendarObj = JSON.parse(trimmed);
    } catch {
      return null;
    }
  }

  if (typeof calendarObj !== 'object' || Array.isArray(calendarObj) || calendarObj === null) {
    return null;
  }

  const countsByDate = new Map();
  let maxTimestampMs = 0;

  for (const [tsKey, rawCount] of Object.entries(calendarObj)) {
    const seconds = Number(tsKey);
    const count = Number(rawCount);
    if (!Number.isFinite(seconds) || seconds <= 0 || !Number.isFinite(count) || count < 0) {
      continue;
    }
    const ms = seconds * 1000;
    if (ms > maxTimestampMs) {
      maxTimestampMs = ms;
    }
    const dateKey = new Date(ms).toISOString().slice(0, 10);
    countsByDate.set(dateKey, (countsByDate.get(dateKey) || 0) + count);
  }

  return { countsByDate, maxTimestampMs };
};

/**
 * Builds a trailing 365-day contribution matrix matching githubService.processContributions.
 */
export const processLeetCodeCalendar = (submissionCalendar, { referenceDate } = {}) => {
  const parsed = parseSubmissionCalendar(submissionCalendar);
  if (!parsed) {
    return { totalContributions: 0, activeDays: 0, weeks: [], monthLabels: [] };
  }

  const { countsByDate, maxTimestampMs } = parsed;
  const now = referenceDate ? new Date(referenceDate) : new Date();
  const todayUtcMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const latestDataUtcMs = maxTimestampMs
    ? Date.UTC(
        new Date(maxTimestampMs).getUTCFullYear(),
        new Date(maxTimestampMs).getUTCMonth(),
        new Date(maxTimestampMs).getUTCDate()
      )
    : 0;
  const endUtcMs = Math.max(todayUtcMs, latestDataUtcMs);

  const dayMs = 86400000;
  const dailyEntries = [];
  let totalContributions = 0;
  let activeDays = 0;

  for (let offset = 364; offset >= 0; offset -= 1) {
    const dateStr = new Date(endUtcMs - offset * dayMs).toISOString().slice(0, 10);
    const count = countsByDate.get(dateStr) || 0;
    if (count > 0) activeDays += 1;
    totalContributions += count;
    dailyEntries.push({
      date: dateStr,
      count,
      level: getLeetCodeLevel(count),
    });
  }

  const { weeks, monthLabels } = processContributions(dailyEntries);
  return { totalContributions, activeDays, weeks, monthLabels };
};

const fetchJsonWithTimeout = async (url, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers?.get?.('content-type') || '';
    if (contentType && !contentType.includes('application/json')) {
      throw new Error('Unexpected non-JSON response');
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

const normalizeApiResponse = (rawData) => {
  if (!rawData || typeof rawData !== 'object') return null;
  if (rawData.status === 'error') return null;
  if (Array.isArray(rawData.errors) ? rawData.errors.length > 0 : Boolean(rawData.errors)) {
    return null;
  }

  const rawCalendar =
    rawData.submissionCalendar ??
    rawData.data?.matchedUser?.userCalendar?.submissionCalendar;
  if (rawCalendar == null) return null;

  const processed = processLeetCodeCalendar(rawCalendar);
  if (processed.weeks.length === 0) return null;

  return {
    ...processed,
    ...(typeof rawData.totalActiveDays === 'number' ? { activeDays: rawData.totalActiveDays } : {}),
    ...(typeof rawData.totalSolved === 'number' ? { totalSolved: rawData.totalSolved } : {}),
    ...(typeof rawData.easySolved === 'number' ? { easySolved: rawData.easySolved } : {}),
    ...(typeof rawData.mediumSolved === 'number' ? { mediumSolved: rawData.mediumSolved } : {}),
    ...(typeof rawData.hardSolved === 'number' ? { hardSolved: rawData.hardSolved } : {}),
  };
};

/**
 * Fetch live LeetCode submission calendar telemetry with caching, first-party API support,
 * and multi-provider fallbacks.
 *
 * @param {string} username - LeetCode username (defaults to 'Prosun01')
 * @returns {Promise<{totalContributions: number, activeDays: number, totalSolved?: number, easySolved?: number, mediumSolved?: number, hardSolved?: number, weeks: Array, monthLabels: Array}>}
 */
export const fetchLeetCodeContributions = async (username = 'Prosun01') => {
  const cacheKey = `lc_contrib_${username}`;
  const storage = getSessionStorage();

  try {
    const cached = storage?.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 10 * 60 * 1000) {
        return data;
      }
    }
  } catch {
    // Ignore sessionStorage errors
  }

  const safeUser = encodeURIComponent(username);
  const endpoints = [
    ...(isHostedOrigin() ? [`/api/leetcode?username=${safeUser}`] : []),
    `${FAISAL_LEETCODE_API}/${safeUser}`,
    `${PIED_LEETCODE_API}/user/${safeUser}/calendar`,
    `${TASHIF_LEETCODE_API}/${safeUser}`,
    `${ALFA_LEETCODE_API}/userProfileCalendar?username=${safeUser}`,
  ];

  for (const url of endpoints) {
    try {
      const rawData = await fetchJsonWithTimeout(url, 10000);
      const normalized = normalizeApiResponse(rawData);
      if (normalized) {
        try {
          storage?.setItem(cacheKey, JSON.stringify({ data: normalized, timestamp: Date.now() }));
        } catch {}
        return normalized;
      }
    } catch {
      // Try next fallback endpoint
    }
  }

  throw new Error('LeetCode submission activity is currently unavailable from public endpoints.');
};
