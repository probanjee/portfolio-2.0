const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{1,30}$/;

const USER_CALENDAR_QUERY = `
  query getUserLeetCode($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        submissionCalendar
        totalActiveDays
      }
    }
  }
`;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const rawUsername = Array.isArray(req.query?.username)
    ? req.query.username[0]
    : req.query?.username || 'Prosun01';
  const username = String(rawUsername).trim();

  if (!USERNAME_PATTERN.test(username)) {
    return res.status(400).json({ error: 'Invalid LeetCode username.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
        Origin: 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query: USER_CALENDAR_QUERY,
        variables: { username },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream LeetCode service unavailable.' });
    }

    const payload = await response.json();
    const matchedUser = payload?.data?.matchedUser;
    if (!matchedUser?.userCalendar?.submissionCalendar) {
      return res.status(404).json({ error: 'LeetCode profile calendar not found.' });
    }

    const acCounts = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const countByDifficulty = Object.fromEntries(
      acCounts.map((entry) => [entry.difficulty, entry.count])
    );

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    return res.status(200).json({
      totalSolved: typeof countByDifficulty.All === 'number' ? countByDifficulty.All : undefined,
      easySolved: typeof countByDifficulty.Easy === 'number' ? countByDifficulty.Easy : undefined,
      mediumSolved: typeof countByDifficulty.Medium === 'number' ? countByDifficulty.Medium : undefined,
      hardSolved: typeof countByDifficulty.Hard === 'number' ? countByDifficulty.Hard : undefined,
      totalActiveDays: matchedUser.userCalendar.totalActiveDays,
      submissionCalendar: matchedUser.userCalendar.submissionCalendar,
    });
  } catch {
    clearTimeout(timeout);
    return res.status(502).json({ error: 'Unable to fetch LeetCode telemetry.' });
  }
}
