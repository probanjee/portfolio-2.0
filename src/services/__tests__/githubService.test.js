import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processContributions, fetchGitHubContributions } from '../githubService';

describe('githubService', () => {
  let store = {};
  const mockStorage = {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, val) => { store[key] = val; }),
    clear: vi.fn(() => { store = {}; })
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    store = {};
    global.window = { sessionStorage: mockStorage };
  });

  describe('processContributions', () => {
    it('handles empty or null contributions array safely', () => {
      expect(processContributions([])).toEqual({ weeks: [], monthLabels: [] });
      expect(processContributions(null)).toEqual({ weeks: [], monthLabels: [] });
    });

    it('organizes days into 7-day weeks and extracts month labels', () => {
      // 14 days starting on a Sunday (2026-01-04 is a Sunday)
      const mockContributions = [
        { date: '2026-01-04', count: 2, level: 1 },
        { date: '2026-01-05', count: 0, level: 0 },
        { date: '2026-01-06', count: 1, level: 1 },
        { date: '2026-01-07', count: 5, level: 2 },
        { date: '2026-01-08', count: 0, level: 0 },
        { date: '2026-01-09', count: 3, level: 1 },
        { date: '2026-01-10', count: 0, level: 0 },
        { date: '2026-01-11', count: 4, level: 1 },
        { date: '2026-01-12', count: 1, level: 1 },
        { date: '2026-01-13', count: 0, level: 0 },
        { date: '2026-01-14', count: 0, level: 0 },
        { date: '2026-01-15', count: 2, level: 1 },
        { date: '2026-01-16', count: 0, level: 0 },
        { date: '2026-01-17', count: 7, level: 3 }
      ];

      const { weeks, monthLabels } = processContributions(mockContributions);
      expect(weeks).toHaveLength(2);
      expect(weeks[0]).toHaveLength(7);
      expect(weeks[1]).toHaveLength(7);
      expect(monthLabels).toHaveLength(1);
      expect(monthLabels[0]).toEqual({ index: 0, label: 'Jan' });
    });

    it('pads initial days if first entry is not Sunday', () => {
      // 2026-01-07 is Wednesday (day 3)
      const mockContributions = [
        { date: '2026-01-07', count: 5, level: 2 },
        { date: '2026-01-08', count: 0, level: 0 },
        { date: '2026-01-09', count: 3, level: 1 },
        { date: '2026-01-10', count: 0, level: 0 }
      ];

      const { weeks } = processContributions(mockContributions);
      expect(weeks).toHaveLength(1);
      expect(weeks[0]).toHaveLength(7);
      // Sunday, Monday, Tuesday should be null
      expect(weeks[0][0]).toBeNull();
      expect(weeks[0][1]).toBeNull();
      expect(weeks[0][2]).toBeNull();
      // Wednesday should be mockContributions[0]
      expect(weeks[0][3]).toEqual(mockContributions[0]);
    });
  });

  describe('fetchGitHubContributions', () => {
    it('fetches successfully from primary endpoint and caches result in sessionStorage', async () => {
      const mockApiData = {
        total: { lastYear: 150 },
        contributions: [
          { date: '2026-01-04', count: 10, level: 2 },
          { date: '2026-01-05', count: 5, level: 1 }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiData
      });

      const result = await fetchGitHubContributions('testuser');
      expect(result.totalContributions).toBe(150);
      expect(result.weeks.length).toBeGreaterThan(0);
      expect(mockStorage.setItem).toHaveBeenCalled();
    });

    it('falls back to secondary endpoint if primary fails', async () => {
      const fallbackApiData = {
        years: [{ year: '2026', total: 200 }],
        contributions: [
          { date: '2026-01-04', count: 20, level: 3 }
        ]
      };

      global.fetch = vi.fn()
        .mockRejectedValueOnce(new Error('Network error on primary'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => fallbackApiData
        });

      const result = await fetchGitHubContributions('testuser2');
      expect(result.totalContributions).toBe(200);
    });

    it('throws error if both endpoints fail', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('All endpoints down'));
      await expect(fetchGitHubContributions('unknown_user')).rejects.toThrow();
    });
  });
});
