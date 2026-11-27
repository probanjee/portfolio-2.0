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

  // Restrained teal/green activity scale with neutral empty cells
  const getCellColorClass = (level) => {
    switch (level) {
      case 1:
        return 'bg-[#087F79]/20 dark:bg-[#55D6C8]/15 border-[#087F79]/25 dark:border-[#55D6C8]/20 hover:bg-[#087F79]/30 dark:hover:bg-[#55D6C8]/25';
      case 2:
        return 'bg-[#087F79]/40 dark:bg-[#55D6C8]/30 border-[#087F79]/45 dark:border-[#55D6C8]/35 hover:bg-[#087F79]/50 dark:hover:bg-[#55D6C8]/40';
      case 3:
        return 'bg-[#087F79]/65 dark:bg-[#55D6C8]/55 border-[#087F79]/70 dark:border-[#55D6C8]/60 hover:bg-[#087F79]/75 dark:hover:bg-[#55D6C8]/65';
      case 4:
        return 'bg-[#087F79] dark:bg-[#55D6C8] border-[#087F79] dark:border-[#55D6C8] hover:opacity-90';
      default:
        return 'bg-[#17202B]/[0.06] dark:bg-white/[0.06] border-[#17202B]/10 dark:border-white/10 hover:border-[#17202B]/20 dark:hover:border-white/20';
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
          {/* LEFT: GitHub Contribution Activity Heatmap (7 Cols) */}
          <div className="lg:col-span-7 w-full">
            <Card hoverEffect={false} className="p-6 sm:p-7 space-y-6">
              {/* Heatmap Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#17202B]/10 dark:border-white/[0.09]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl liquid-glass-well flex items-center justify-center text-[#17202B] dark:text-[#F4F6F8]">
                    <Github className="w-5 h-5 text-[#17202B] dark:text-[#F4F6F8]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17202B] dark:text-[#F4F6F8] flex items-center gap-2">
                      <span>GitHub Contribution Heatmap</span>
                    </h4>
                    <a
                      href="https://github.com/probanjee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] hover:text-[#087F79] dark:hover:text-[#55D6C8] transition-colors flex items-center gap-1 group/user"
                    >
                      <span>@probanjee</span>
                      <ExternalLink className="w-3 h-3 group-hover/user:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Real Annual Count Badge */}
                {contribData && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full liquid-glass-well text-[#17202B] dark:text-[#F4F6F8] font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                    <span className="font-bold tabular-nums">{contribData.totalContributions.toLocaleString()} Contributions</span>
                    <span className="text-[10px] text-zinc-900 dark:text-zinc-300 font-normal">/ year</span>
                  </div>
                )}
              </div>

              {/* Heatmap Visual Container */}
              {loading ? (
                <div className="h-44 flex flex-col items-center justify-center space-y-3 text-zinc-900 dark:text-zinc-300 font-mono text-xs">
                  <RefreshCw className="w-5 h-5 animate-spin text-zinc-950 dark:text-white" />
                  <span>Loading telemetry feed from GitHub...</span>
                </div>
              ) : error ? (
                <div className="p-6 rounded-2xl liquid-glass-well liquid-rim border border-red-500/35 text-center space-y-4 font-mono">
                  <div className="flex items-center justify-center text-red-900 dark:text-red-300 space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Telemetry Stream Unavailable</span>
                  </div>
                  <p className="text-xs text-zinc-900 dark:text-zinc-200 font-sans max-w-md mx-auto">
                    Live contribution metrics could not be loaded from public GitHub endpoints. You can view all real-time commit activity directly on GitHub.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href="https://github.com/probanjee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold font-mono rounded-full liquid-btn-primary liquid-rim"
                    >
                      <Github className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">View GitHub Profile</span>
                      <ExternalLink className="w-3.5 h-3.5 relative z-10" />
                    </a>
                    <button
                      onClick={loadContributions}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-mono rounded-full liquid-btn-secondary liquid-rim"
                    >
                      <RefreshCw className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Retry</span>
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
                    className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent focus:outline-none focus:ring-1 focus:ring-white/50 rounded-lg"
                  >
                    <div className="inline-block min-w-full">
                      {/* Month Headers */}
                      <div className="flex text-[9px] font-mono text-zinc-900 dark:text-zinc-300 pl-8 mb-1.5 h-4 relative">
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
                        <div className="flex flex-col justify-between h-[92px] w-8 pr-2 text-[8px] font-mono text-zinc-900 dark:text-zinc-300 text-right select-none">
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
                          <strong className="text-[#17202B] dark:text-[#F4F6F8] font-bold tabular-nums">{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on{' '}
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
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-[#17202B]/[0.06] dark:bg-white/[0.06] border-[#17202B]/10 dark:border-white/10" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-[#087F79]/20 dark:bg-[#55D6C8]/15 border-[#087F79]/25 dark:border-[#55D6C8]/20" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-[#087F79]/40 dark:bg-[#55D6C8]/30 border-[#087F79]/45 dark:border-[#55D6C8]/35" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-[#087F79]/65 dark:bg-[#55D6C8]/55 border-[#087F79]/70 dark:border-[#55D6C8]/60" />
                        <span className="w-2.5 h-2.5 rounded-[3px] border bg-[#087F79] dark:bg-[#55D6C8] border-[#087F79] dark:border-[#55D6C8]" />
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
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#17202B] dark:text-[#F4F6F8] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#087F79] dark:text-[#55D6C8]" />
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
