import { processContributions } from './githubService';

const FAISAL_LEETCODE_API = 'https://leetcode-api-faisalshohag.vercel.app';
const ALFA_LEETCODE_API = 'https://alfa-leetcode-api.onrender.com';

const getSessionStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
  } catch {}
  return null;
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

const fetchWithTimeout = async (url, timeoutMs = 7000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

/**
 * Fetch live LeetCode submission calendar telemetry with caching and fallback.
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

  // 1. Primary CORS-enabled endpoint
  try {
    const rawData = await fetchWithTimeout(`${FAISAL_LEETCODE_API}/${safeUser}`);
    if (rawData && rawData.submissionCalendar != null && !rawData.errors) {
      const processed = processLeetCodeCalendar(rawData.submissionCalendar);
      if (processed.weeks.length > 0) {
        const result = {
          ...processed,
          ...(typeof rawData.totalSolved === 'number' ? { totalSolved: rawData.totalSolved } : {}),
          ...(typeof rawData.easySolved === 'number' ? { easySolved: rawData.easySolved } : {}),
          ...(typeof rawData.mediumSolved === 'number' ? { mediumSolved: rawData.mediumSolved } : {}),
          ...(typeof rawData.hardSolved === 'number' ? { hardSolved: rawData.hardSolved } : {}),
        };

        try {
          storage?.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
        } catch {}

        return result;
      }
    }
  } catch {
    // Proceed to fallback endpoint
  }

  // 2. Fallback calendar endpoint
  try {
    const fallbackData = await fetchWithTimeout(`${ALFA_LEETCODE_API}/userProfileCalendar?username=${safeUser}`);
    const rawCalendar =
      fallbackData?.submissionCalendar ??
      fallbackData?.data?.matchedUser?.userCalendar?.submissionCalendar;

    if (rawCalendar != null) {
      const processed = processLeetCodeCalendar(rawCalendar);
      if (processed.weeks.length > 0) {
        const result = {
          ...processed,
          ...(typeof fallbackData?.totalActiveDays === 'number'
            ? { activeDays: fallbackData.totalActiveDays }
            : {}),
        };

        try {
          storage?.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
        } catch {}

        return result;
      }
    }
  } catch {
    // Both endpoints failed
  }

  throw new Error('LeetCode submission activity is currently unavailable from public endpoints.');
};
