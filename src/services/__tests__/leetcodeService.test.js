import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getLeetCodeLevel,
  parseSubmissionCalendar,
  processLeetCodeCalendar,
  fetchLeetCodeContributions,
} from '../leetcodeService';

describe('leetcodeService', () => {
  let store = {};
  const mockStorage = {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, val) => { store[key] = val; }),
    clear: vi.fn(() => { store = {}; }),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    store = {};
    global.window = { sessionStorage: mockStorage };
  });

  describe('getLeetCodeLevel', () => {
    it('maps submission counts cleanly to 0..4 levels', () => {
      expect(getLeetCodeLevel(0)).toBe(0);
      expect(getLeetCodeLevel(-2)).toBe(0);
      expect(getLeetCodeLevel(1)).toBe(1);
      expect(getLeetCodeLevel(2)).toBe(1);
      expect(getLeetCodeLevel(3)).toBe(2);
      expect(getLeetCodeLevel(5)).toBe(2);
      expect(getLeetCodeLevel(6)).toBe(3);
      expect(getLeetCodeLevel(10)).toBe(3);
      expect(getLeetCodeLevel(11)).toBe(4);
      expect(getLeetCodeLevel(25)).toBe(4);
    });
  });

  describe('parseSubmissionCalendar', () => {
    it('handles invalid or empty inputs gracefully', () => {
      expect(parseSubmissionCalendar(null)).toBeNull();
      expect(parseSubmissionCalendar('')).toBeNull();
      expect(parseSubmissionCalendar('{bad-json')).toBeNull();
      expect(parseSubmissionCalendar([])).toBeNull();
    });

    it('parses serialized JSON string and object epoch timestamps', () => {
      const ts = Math.floor(Date.UTC(2026, 10, 27) / 1000);
      const parsedFromStr = parseSubmissionCalendar(JSON.stringify({ [ts]: 6 }));
      expect(parsedFromStr.countsByDate.get('2026-11-27')).toBe(6);

      const parsedFromObj = parseSubmissionCalendar({ [ts]: 4 });
      expect(parsedFromObj.countsByDate.get('2026-11-27')).toBe(4);
    });
  });

  describe('processLeetCodeCalendar', () => {
    it('builds a 365-day matrix and computes totalContributions and activeDays', () => {
      const day1 = Math.floor(Date.UTC(2026, 10, 20) / 1000);
      const day2 = Math.floor(Date.UTC(2026, 10, 27) / 1000);
      const result = processLeetCodeCalendar(
        { [day1]: 4, [day2]: 16 },
        { referenceDate: new Date(Date.UTC(2026, 10, 28)) }
      );

      expect(result.totalContributions).toBe(20);
      expect(result.activeDays).toBe(2);
      expect(result.weeks.length).toBeGreaterThanOrEqual(52);
      expect(result.monthLabels.length).toBeGreaterThan(0);

      const flatDays = result.weeks.flat().filter(Boolean);
      expect(flatDays).toHaveLength(365);
      expect(flatDays.find((d) => d.date === '2026-11-20')).toEqual({
        date: '2026-11-20',
        count: 4,
        level: 2,
      });
      expect(flatDays.find((d) => d.date === '2026-11-27')).toEqual({
        date: '2026-11-27',
        count: 16,
        level: 4,
      });
    });
  });

  describe('fetchLeetCodeContributions', () => {
    it('fetches from primary endpoint, preserves solved counts, and caches', async () => {
      const day = Math.floor(Date.UTC(2026, 10, 27) / 1000);
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          totalSolved: 370,
          easySolved: 100,
          mediumSolved: 199,
          hardSolved: 71,
          submissionCalendar: { [day]: 12 },
        }),
      });

      const res = await fetchLeetCodeContributions('Prosun01');
      expect(res.totalSolved).toBe(370);
      expect(res.totalContributions).toBe(12);
      expect(mockStorage.setItem).toHaveBeenCalled();
    });

    it('falls back to secondary calendar endpoint if primary fails', async () => {
      const day = Math.floor(Date.UTC(2026, 10, 27) / 1000);
      global.fetch = vi.fn()
        .mockRejectedValueOnce(new Error('Primary offline'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            totalActiveDays: 58,
            submissionCalendar: JSON.stringify({ [day]: 5 }),
          }),
        });

      const res = await fetchLeetCodeContributions('Prosun01_fallback');
      expect(res.totalContributions).toBe(5);
      expect(res.activeDays).toBe(58);
    });

    it('throws error when all endpoints fail', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network unavailable'));
      await expect(fetchLeetCodeContributions('missing_user')).rejects.toThrow();
    });
  });
});
