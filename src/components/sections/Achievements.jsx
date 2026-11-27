import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ExternalLink,
  Github,
  Flame,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Calendar
} from 'lucide-react';
import Card from '../ui/Card';
import { fetchGitHubContributions } from '../../services/githubService';

export const Achievements = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contribData, setContribData] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  const loadContributions = async () => {
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
  };

  useEffect(() => {
    loadContributions();
  }, []);

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
      tagColor: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/25'
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
      tagColor: 'text-sky-700 dark:text-cyan-400 bg-sky-500/10 border-sky-500/25'
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
      tagColor: 'text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/25'
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
      tagColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
    }
  ];

  // Intensity color mapper aligned with Dark & Light themes
  const getCellColorClass = (level) => {
    switch (level) {
      case 1:
        return 'bg-sky-200 dark:bg-blue-900/60 border-sky-300/80 dark:border-blue-700/40 hover:bg-sky-300 dark:hover:bg-blue-700';
      case 2:
        return 'bg-blue-400 dark:bg-blue-600 border-blue-500/60 dark:border-blue-400/50 hover:bg-blue-500';
      case 3:
        return 'bg-blue-500 dark:bg-indigo-500 border-blue-600/60 dark:border-indigo-300/60 hover:bg-blue-600 dark:hover:bg-indigo-400';
      case 4:
        return 'bg-blue-600 dark:bg-sky-400 border-blue-700/70 dark:border-cyan-300 hover:bg-blue-700 dark:hover:bg-cyan-300';
      default:
        return 'bg-slate-900/[0.05] dark:bg-slate-900/75 border-slate-900/[0.08] dark:border-white/[0.06] hover:border-slate-900/25 dark:hover:border-white/25';
    }
  };

  const dayOfWeekLabels = [
    { row: 1, label: 'Mon' },
    { row: 3, label: 'Wed' },
    { row: 5, label: 'Fri' }
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
            className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-widest"
          >
            &gt;_ ACHIEVEMENT LOG
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Developer Achievements &amp; Activity
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl font-medium"
          >
            Tracking verified open-source contributions, daily problem-solving consistency, and earned developer badges across GitHub and LeetCode.
          </motion.p>
        </div>

        {/* Desktop Split / Mobile Stacked Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: GitHub Contribution Activity Heatmap (7 Cols) */}
          <div className="lg:col-span-7 w-full">
            <Card hoverEffect={false} className="p-6 sm:p-7 space-y-6">
              {/* Heatmap Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl liquid-glass-well flex items-center justify-center text-slate-700 dark:text-slate-200">
                    <Github className="w-5 h-5 text-blue-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span>GitHub Contribution Heatmap</span>
                    </h4>
                    <a
                      href="https://github.com/probanjee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 group/user"
                    >
                      <span>@probanjee</span>
                      <ExternalLink className="w-3 h-3 group-hover/user:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Real Annual Count Badge */}
                {contribData && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span className="font-bold tabular-nums">{contribData.totalContributions.toLocaleString()} Contributions</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">/ year</span>
                  </div>
                )}
              </div>

              {/* Heatmap Visual Container */}
              {loading ? (
                <div className="h-44 flex flex-col items-center justify-center space-y-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-600 dark:text-sky-400" />
                  <span>Loading telemetry feed from GitHub...</span>
                </div>
              ) : error ? (
                <div className="p-6 rounded-2xl liquid-glass-well border border-red-500/20 text-center space-y-4 font-mono">
                  <div className="flex items-center justify-center text-amber-600 dark:text-amber-400 space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Telemetry Stream Unavailable</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans max-w-md mx-auto">
                    Live contribution metrics could not be loaded from public GitHub endpoints. You can view all real-time commit activity directly on GitHub.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href="https://github.com/probanjee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold font-mono rounded-full liquid-btn-primary"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={loadContributions}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-mono rounded-full liquid-btn-secondary"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                  </div>
                </div>
              ) : contribData && contribData.weeks.length > 0 ? (
                <div className="space-y-3">
                  {/* Horizontally scrollable heatmap viewport */}
                  <div
                    tabIndex={0}
                    role="region"
                    aria-label="GitHub annual contribution calendar heatmap"
                    className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-400/30 scrollbar-track-transparent focus:outline-none focus:ring-1 focus:ring-blue-500/40 rounded-lg"
                  >
                    <div className="inline-block min-w-full">
                      {/* Month Headers */}
                      <div className="flex text-[9px] font-mono text-slate-500 dark:text-slate-400 pl-8 mb-1.5 h-4 relative">
                        {contribData.monthLabels.map((m) => (
                          <span
                            key={`${m.label}-${m.index}`}
                            className="absolute uppercase tracking-wider font-semibold"
                            style={{ left: `${m.index * 13 + 32}px` }}
                          >
                            {m.label}
                          </span>
                        ))}
                      </div>

                      {/* Main Grid: Days on left, Weeks across */}
                      <div className="flex items-start">
                        {/* Day of Week Labels */}
                        <div className="flex flex-col justify-between h-[92px] w-8 pr-2 text-[8px] font-mono text-slate-500 dark:text-slate-500 text-right select-none">
                          <span className="h-[11px] leading-[11px]">Sun</span>
                          <span className="h-[11px] leading-[11px]">Tue</span>
                          <span className="h-[11px] leading-[11px]">Thu</span>
                          <span className="h-[11px] leading-[11px]">Sat</span>
                        </div>

                        {/* Week Columns Grid */}
                        <div
                          role="grid"
                          aria-label="GitHub contribution activity grid"
                          className="flex gap-[3px]"
                        >
                          {contribData.weeks.map((week, wIdx) => (
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
                                    aria-label={`${day.count} contributions on ${day.date}`}
                                    onMouseEnter={() => setHoveredDay(day)}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    onFocus={() => setHoveredDay(day)}
                                    onBlur={() => setHoveredDay(null)}
                                    className={`w-[11px] h-[11px] rounded-[3px] border transition-transform duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-white ${getCellColorClass(
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08] text-[10px] font-mono">
                    <div className="text-slate-600 dark:text-slate-400 min-h-[18px]">
                      {hoveredDay ? (
                        <span>
                          <strong className="text-slate-900 dark:text-slate-100 font-bold tabular-nums">{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on{' '}
                          <span className="text-blue-600 dark:text-sky-400">{hoveredDay.date}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">Hover or focus any square to inspect metrics</span>
                      )}
                    </div>

                    {/* Intensity Legend */}
                    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                      <span>Less</span>
                      <div className="flex items-center space-x-1" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-slate-900/[0.05] dark:bg-slate-900/75 border-slate-900/[0.08] dark:border-white/[0.06]" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-sky-200 dark:bg-blue-900/60 border-sky-300/80 dark:border-blue-700/40" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-blue-400 dark:bg-blue-600 border-blue-500/60 dark:border-blue-400/50" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-blue-500 dark:bg-indigo-500 border-blue-600/60 dark:border-indigo-300/60" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-blue-600 dark:bg-sky-400 border-blue-700/70 dark:border-cyan-300" />
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </Card>
          </div>

          {/* RIGHT: Compact List of Verified Achievements (5 Cols) */}
          <div className="lg:col-span-5 w-full space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>Verified Badges ({achievements.length})</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 uppercase">
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
                  className="group block p-4 rounded-[22px] glass-panel liquid-rim card-hover-effect focus:outline-none focus:ring-2 focus:ring-blue-500/40"
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
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${item.tagColor}`}>
                          {item.platform}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        <span className="text-[9px] font-semibold">{item.tag}</span>
                        <span className="text-blue-600 dark:text-sky-400 font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
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
