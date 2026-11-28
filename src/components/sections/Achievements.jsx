import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  Github,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import Card from '../ui/Card';
import { LeetCodeIcon } from '../ui/Icons';
import { fetchGitHubContributions } from '../../services/githubService';
import { fetchLeetCodeContributions } from '../../services/leetcodeService';

// Distinct restrained teal-to-green activity scale with neutral empty cells
const HEATMAP_CELL_CLASSES = {
  0: 'bg-[#E8EDF1] dark:bg-[#1D242E] border-[#17202B]/10 dark:border-white/10 hover:border-[#17202B]/25 dark:hover:border-white/25',
  1: 'bg-[#99F6E4] dark:bg-[#115E59] border-[#087F79]/30 dark:border-[#2DD4BF]/35 hover:brightness-95 dark:hover:brightness-110',
  2: 'bg-[#34D399] dark:bg-[#059669] border-[#059669]/40 dark:border-[#34D399]/40 hover:brightness-95 dark:hover:brightness-110',
  3: 'bg-[#16A34A] dark:bg-[#22C55E] border-[#15803D]/50 dark:border-[#4ADE80]/45 hover:brightness-95 dark:hover:brightness-110',
  4: 'bg-[#14532D] dark:bg-[#4ADE80] border-[#14532D] dark:border-[#86EFAC]/60 hover:brightness-110 dark:hover:brightness-105',
};

const getCellColorClass = (level) => HEATMAP_CELL_CLASSES[level] || HEATMAP_CELL_CLASSES[0];

/**
 * Shared accessible calendar heatmap card for GitHub and LeetCode telemetry feeds.
 */
const ActivityHeatmapCard = ({
  title,
  handleLabel,
  profileUrl,
  icon: Icon,
  loadingText,
  unavailableMessage,
  profileCtaLabel,
  unitSingular,
  unitPlural,
  regionAriaLabel,
  gridAriaLabel,
  summaryLabel,
  extraSummary,
  loading,
  error,
  data,
  onRetry,
}) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (data?.weeks?.length && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  return (
    <Card hoverEffect={false} className="p-6 sm:p-7 space-y-6">
      {/* Heatmap Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#17202B]/10 dark:border-white/[0.09]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl liquid-glass-well flex items-center justify-center text-[#17202B] dark:text-[#F4F6F8] shrink-0">
            <Icon className="w-5 h-5 text-[#17202B] dark:text-[#F4F6F8]" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#17202B] dark:text-[#F4F6F8] flex items-center gap-2">
              <span>{title}</span>
            </h4>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] hover:text-[#087F79] dark:hover:text-[#55D6C8] transition-colors inline-flex items-center gap-1 group/user rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              <span>{handleLabel}</span>
              <ExternalLink className="w-3 h-3 group-hover/user:translate-x-0.5 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Real Annual Count Badge */}
        {data && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full liquid-glass-well text-[#17202B] dark:text-[#F4F6F8] font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="font-bold tabular-nums">
                {data.totalContributions.toLocaleString()} {summaryLabel}
              </span>
              <span className="text-[10px] text-[#5B6573] dark:text-[#A7B0BC] font-normal">/ year</span>
            </div>
            {extraSummary}
          </div>
        )}
      </div>

      {/* Heatmap Visual Container */}
      {loading ? (
        <div className="h-40 flex flex-col items-center justify-center space-y-3 text-[#5B6573] dark:text-[#A7B0BC] font-mono text-xs">
          <RefreshCw className="w-5 h-5 animate-spin text-[#087F79] dark:text-[#55D6C8]" aria-hidden="true" />
          <span>{loadingText}</span>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl liquid-glass-well border border-red-500/35 text-center space-y-4 font-mono">
          <div className="flex items-center justify-center text-red-700 dark:text-red-300 space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider">Telemetry Stream Unavailable</span>
          </div>
          <p className="text-xs text-[#5B6573] dark:text-[#A7B0BC] font-sans max-w-md mx-auto">
            {unavailableMessage}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold font-mono rounded-full liquid-btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              <Icon className="w-4 h-4 relative z-10" aria-hidden="true" />
              <span className="relative z-10">{profileCtaLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 relative z-10" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-mono rounded-full liquid-btn-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              <RefreshCw className="w-3.5 h-3.5 relative z-10" aria-hidden="true" />
              <span className="relative z-10">Retry</span>
            </button>
          </div>
        </div>
      ) : data && data.weeks.length > 0 ? (
        <div className="space-y-3">
          {/* Fixed day-of-week axis + horizontally scrollable calendar grid */}
          <div className="flex items-start">
            <div
              aria-hidden="true"
              className="flex flex-col justify-between h-[92px] w-8 pr-2 mt-[26px] text-[8px] font-mono text-[#5B6573] dark:text-[#A7B0BC] text-right select-none shrink-0"
            >
              <span className="h-[11px] leading-[11px]">Sun</span>
              <span className="h-[11px] leading-[11px]">Tue</span>
              <span className="h-[11px] leading-[11px]">Thu</span>
              <span className="h-[11px] leading-[11px]">Sat</span>
            </div>

            <div
              ref={scrollContainerRef}
              tabIndex={0}
              role="region"
              aria-label={regionAriaLabel}
              className="flex-1 min-w-0 overflow-x-auto pb-3 pt-1 custom-scrollbar focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] rounded-lg"
            >
              <div className="inline-block min-w-full">
                {/* Month Headers */}
                <div className="flex text-[9px] font-mono text-[#5B6573] dark:text-[#A7B0BC] mb-1.5 h-4 relative">
                  {data.monthLabels.map((m) => (
                    <span
                      key={`${m.label}-${m.index}`}
                      className="absolute uppercase tracking-wider font-semibold"
                      style={{ left: `${m.index * 14}px` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Week Columns Grid */}
                <div
                  role="grid"
                  aria-label={gridAriaLabel}
                  className="flex gap-[3px]"
                >
                  {data.weeks.map((week, wIdx) => (
                    <div
                      key={`week-${wIdx}`}
                      role="row"
                      className="flex flex-col gap-[3px]"
                    >
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${wIdx}-${dIdx}`}
                              className="w-[11px] h-[11px] rounded-[3px] opacity-0"
                              aria-hidden="true"
                            />
                          );
                        }
                        const isHovered = hoveredDay && hoveredDay.date === day.date;
                        return (
                          <button
                            key={day.date}
                            type="button"
                            role="gridcell"
                            aria-label={`${day.count} ${day.count === 1 ? unitSingular : unitPlural} on ${day.date}`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            onFocus={() => setHoveredDay(day)}
                            onBlur={() => setHoveredDay(null)}
                            className={`w-[11px] h-[11px] rounded-[3px] border transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#087F79] dark:focus:ring-[#55D6C8] ${getCellColorClass(
                              day.level
                            )} ${isHovered ? 'scale-125 z-10' : ''}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#17202B]/10 dark:border-white/[0.09] text-[10px] font-mono">
            <div className="text-[#5B6573] dark:text-[#A7B0BC] min-h-[18px]">
              {hoveredDay ? (
                <span>
                  <strong className="text-[#17202B] dark:text-[#F4F6F8] font-bold tabular-nums">{hoveredDay.count}</strong>{' '}
                  {hoveredDay.count === 1 ? unitSingular : unitPlural} on{' '}
                  <span className="text-[#17202B] dark:text-[#F4F6F8] font-semibold">{hoveredDay.date}</span>
                </span>
              ) : (
                <span className="text-[#5B6573] dark:text-[#A7B0BC]">Hover or focus any square to inspect metrics</span>
              )}
            </div>

            {/* Intensity Legend */}
            <div className="flex items-center space-x-2 text-[#5B6573] dark:text-[#A7B0BC]">
              <span>Less</span>
              <div className="flex items-center space-x-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`w-2.5 h-2.5 rounded-[3px] border ${HEATMAP_CELL_CLASSES[level]}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export const Achievements = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contribData, setContribData] = useState(null);

  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState(null);
  const [lcData, setLcData] = useState(null);

  const loadContributions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubContributions('probanjee');
      setContribData(data);
    } catch (err) {
      setError(err.message || 'Unable to load live contribution data.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLeetCodeContributions = useCallback(async () => {
    setLcLoading(true);
    setLcError(null);
    try {
      const data = await fetchLeetCodeContributions('Prosun01');
      setLcData(data);
    } catch (err) {
      setLcError(err.message || 'Unable to load live LeetCode submission data.');
    } finally {
      setLcLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContributions();
    loadLeetCodeContributions();
  }, [loadContributions, loadLeetCodeContributions]);

  // Verified achievements list with official badge artwork & external links
  const achievements = [
    {
      id: 'yolo',
      title: 'YOLO',
      platform: 'GitHub',
      badgeUrl: '/assets/badges/yolo.png',
      fallbackBadgeUrl: 'https://github.githubassets.com/assets/yolo-default-be0bbff04951.png',
      description: 'Merged a pull request without code review.',
      link: 'https://github.com/probanjee',
      tag: 'GitHub Milestone',
      tagColor: 'text-[#17202B] dark:text-[#F4F6F8] liquid-glass-well'
    },
    {
      id: 'pull-shark',
      title: 'Pull Shark',
      platform: 'GitHub',
      badgeUrl: '/assets/badges/pull-shark.png',
      fallbackBadgeUrl: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
      description: 'Opened multiple pull requests that were reviewed & merged.',
      link: 'https://github.com/probanjee',
      tag: 'PR Automation',
      tagColor: 'text-[#17202B] dark:text-[#F4F6F8] liquid-glass-well'
    },
    {
      id: 'quickdraw',
      title: 'Quickdraw',
      platform: 'GitHub',
      badgeUrl: '/assets/badges/quickdraw.png',
      fallbackBadgeUrl: 'https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png',
      description: 'Closed an issue or pull request within 5 minutes of opening.',
      link: 'https://github.com/probanjee',
      tag: 'Rapid Response',
      tagColor: 'text-[#17202B] dark:text-[#F4F6F8] liquid-glass-well'
    },
    {
      id: 'leetcode-50',
      title: '50 Days Badge 2026',
      platform: 'LeetCode',
      badgeUrl: '/assets/badges/leetcode-50-days.png',
      fallbackBadgeUrl: 'https://assets.leetcode.com/static_assets/others/50_1080_1080.png',
      description: 'Solved daily coding challenges consistently for 50+ consecutive days.',
      link: 'https://leetcode.com/u/Prosun01/',
      tag: 'Problem Solving',
      tagColor: 'text-[#17202B] dark:text-[#F4F6F8] liquid-glass-well'
    }
  ];

  return (
    <section id="achievements" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] uppercase tracking-widest font-semibold"
          >
            &gt;_ ACHIEVEMENT LOG
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17202B] dark:text-[#F4F6F8]"
          >
            Developer Achievements &amp; Activity
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#5B6573] dark:text-[#A7B0BC] max-w-3xl font-medium"
          >
            Tracking verified open-source contributions, daily problem-solving consistency, and earned developer badges across GitHub and LeetCode.
          </motion.p>
        </div>

        {/* Desktop Split / Mobile Stacked Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: GitHub + LeetCode Activity Heatmaps (7 Cols) */}
          <div className="lg:col-span-7 w-full space-y-6">
            <ActivityHeatmapCard
              title="GitHub Contribution Heatmap"
              handleLabel="@probanjee"
              profileUrl="https://github.com/probanjee"
              icon={Github}
              loadingText="Loading telemetry feed from GitHub..."
              unavailableMessage="Live contribution metrics could not be loaded from public GitHub endpoints. You can view all real-time commit activity directly on GitHub."
              profileCtaLabel="View GitHub Profile"
              unitSingular="contribution"
              unitPlural="contributions"
              regionAriaLabel="GitHub annual contribution calendar heatmap"
              gridAriaLabel="GitHub contribution activity grid"
              summaryLabel="Contributions"
              loading={loading}
              error={error}
              data={contribData}
              onRetry={loadContributions}
            />

            <ActivityHeatmapCard
              title="LeetCode Submission Heatmap"
              handleLabel="@Prosun01"
              profileUrl="https://leetcode.com/u/Prosun01/"
              icon={LeetCodeIcon}
              loadingText="Loading submission feed from LeetCode..."
              unavailableMessage="Live submission metrics could not be loaded from public LeetCode endpoints. You can view problem-solving activity directly on LeetCode."
              profileCtaLabel="View LeetCode Profile"
              unitSingular="submission"
              unitPlural="submissions"
              regionAriaLabel="LeetCode annual submission calendar heatmap"
              gridAriaLabel="LeetCode submission activity grid"
              summaryLabel="Submissions"
              extraSummary={
                lcData && typeof lcData.totalSolved === 'number' ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full liquid-glass-well text-[#087F79] dark:text-[#55D6C8] font-mono text-xs font-bold tabular-nums">
                    {lcData.totalSolved} Solved
                  </div>
                ) : null
              }
              loading={lcLoading}
              error={lcError}
              data={lcData}
              onRetry={loadLeetCodeContributions}
            />
          </div>

          {/* RIGHT: Compact List of Verified Achievements (5 Cols) */}
          <div className="lg:col-span-5 w-full space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#17202B] dark:text-[#F4F6F8] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#087F79] dark:text-[#55D6C8]" aria-hidden="true" />
                <span>Verified Badges ({achievements.length})</span>
              </span>
              <span className="text-[9px] font-mono text-[#5B6573] dark:text-[#A7B0BC] uppercase font-semibold">
                Official Credentials
              </span>
            </div>

            <div className="space-y-3">
              {achievements.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="group block p-4 rounded-[22px] glass-panel card-hover-effect focus:outline-none focus:ring-2 focus:ring-[#087F79]/50 dark:focus:ring-[#55D6C8]/50"
                  aria-label={`${item.platform} Achievement: ${item.title} - ${item.description}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Official Badge Image */}
                    <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl liquid-glass-well flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
                      <img
                        src={item.badgeUrl}
                        alt={`${item.platform} ${item.title} badge`}
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                        onError={(e) => {
                          if (e.currentTarget.src !== item.fallbackBadgeUrl) {
                            e.currentTarget.src = item.fallbackBadgeUrl;
                          }
                        }}
                      />
                    </div>

                    {/* Badge Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#17202B] dark:text-[#F4F6F8] group-hover:opacity-85 transition-opacity truncate">
                          {item.title}
                        </h4>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${item.tagColor}`}>
                          {item.platform}
                        </span>
                      </div>

                      <p className="text-xs text-[#5B6573] dark:text-[#A7B0BC] font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[#5B6573] dark:text-[#A7B0BC]">
                        <span className="text-[9px] font-semibold">{item.tag}</span>
                        <span className="text-[#087F79] dark:text-[#55D6C8] font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
