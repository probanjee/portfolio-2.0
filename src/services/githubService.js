/**
 * Isolated GitHub Contribution Data Service
 * Fetches verified public contribution calendar data for a GitHub user
 * without exposing tokens or secrets in client-side code.
 */

const JOGRUBER_API = 'https://github-contributions-api.jogruber.de/v4';
const VERCEL_FALLBACK_API = 'https://github-contributions.vercel.app/api/v1';

const getSessionStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
  } catch {}
  return null;
};

/**
 * Normalizes contribution array into 52-53 calendar week columns
 * and extracts corresponding month label positions.
 */
export const processContributions = (contributions = []) => {
  if (!contributions || contributions.length === 0) {
    return { weeks: [], monthLabels: [] };
  }

  // Ensure chronological order
  const sorted = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Build 7-day columns (weeks)
  const weeks = [];
  let currentWeek = [];

  // If first item does not start on Sunday (day 0), pad initial days
  const firstDayOfWeek = new Date(sorted[0].date + 'T00:00:00').getDay();
  for (let p = 0; p < firstDayOfWeek; p++) {
    currentWeek.push(null);
  }

  sorted.forEach((item) => {
    currentWeek.push(item);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    // Pad end of last week up to 7 days
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Calculate month labels
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels = [];
  let lastMonth = -1;

  weeks.forEach((week, wIdx) => {
    const firstValidDay = week.find((day) => day !== null);
    if (firstValidDay) {
      const d = new Date(firstValidDay.date + 'T00:00:00');
      const m = d.getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ index: wIdx, label: monthNames[m] });
        lastMonth = m;
      }
    }
  });

  return { weeks, monthLabels };
};

/**
 * Fetch GitHub contribution data for a username.
 * Attempts primary API, falls back to secondary API, or throws error if unavailable.
 *
 * @param {string} username - GitHub username (defaults to 'probanjee')
 * @returns {Promise<{totalContributions: number, weeks: Array, monthLabels: Array}>}
 */
export const fetchGitHubContributions = async (username = 'probanjee') => {
  const cacheKey = `gh_contrib_${username}`;
  const storage = getSessionStorage();
  
  // Check sessionStorage cache (valid for 10 minutes)
  try {
    const cached = storage?.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 10 * 60 * 1000) {
        return data;
      }
    }
  } catch {
    // Ignore sessionStorage errors (e.g. private browsing quota)
  }

  const fetchWithTimeout = async (url, timeoutMs = 6000) => {
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

  let rawData = null;

  // 1. Primary endpoint
  try {
    rawData = await fetchWithTimeout(`${JOGRUBER_API}/${username}?y=last`);
    if (rawData && rawData.contributions) {
      const { weeks, monthLabels } = processContributions(rawData.contributions);
      const total = rawData.total?.lastYear ?? 
        rawData.contributions.reduce((acc, curr) => acc + (curr.count || 0), 0);

      const result = {
        totalContributions: total,
        weeks,
        monthLabels
      };

      try {
        storage?.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
      } catch {}

      return result;
    }
  } catch (primaryErr) {
    // Silently proceed to fallback
  }

  // 2. Fallback endpoint
  try {
    const fallbackData = await fetchWithTimeout(`${VERCEL_FALLBACK_API}/${username}`);
    if (fallbackData && fallbackData.contributions) {
      const { weeks, monthLabels } = processContributions(fallbackData.contributions);
      const total = fallbackData.years?.[0]?.total ??
        fallbackData.contributions.reduce((acc, curr) => acc + (curr.count || 0), 0);

      const result = {
        totalContributions: total,
        weeks,
        monthLabels
      };

      try {
        storage?.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
      } catch {}

      return result;
    }
  } catch (fallbackErr) {
    // Both failed
  }

  throw new Error('GitHub contribution activity is currently unavailable from public endpoints.');
};
