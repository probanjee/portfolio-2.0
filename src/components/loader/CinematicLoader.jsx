import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BACK_WAVE_PATH =
  'M 0 0 C 60 -10, 120 10, 180 0 C 240 -10, 300 10, 360 0 C 420 -10, 480 10, 540 0 C 600 -10, 660 10, 720 0 C 780 -10, 840 10, 900 0 C 960 -10, 1020 10, 1080 0 C 1140 -10, 1200 10, 1260 0 C 1320 -10, 1380 10, 1440 0 C 1500 -10, 1560 10, 1620 0 C 1680 -10, 1740 10, 1800 0 C 1860 -10, 1920 10, 1980 0 C 2040 -10, 2100 10, 2160 0';

const FRONT_WAVE_PATH =
  'M 0 0 C 75 14, 150 -14, 225 0 C 300 14, 375 -14, 450 0 C 525 14, 600 -14, 675 0 C 750 14, 825 -14, 900 0 C 975 14, 1050 -14, 1125 0 C 1200 14, 1275 -14, 1350 0 C 1425 14, 1500 -14, 1575 0 C 1650 14, 1725 -14, 1800 0 C 1875 14, 1950 -14, 2025 0 C 2100 14, 2175 -14, 2250 0';

const LOADER_STATUSES = [
  'POURING SYSTEM CORE & INGESTION...',
  'INITIALIZING SECURE ARCHITECTURE ENCLAVE...',
  'COMPILING C++17 & SECURITY MODULES...',
  'WATER LEVEL REACHING CAPACITY...',
  'SYSTEM READY FOR DEPLOYMENT...',
];

const TEXT_STYLE = {
  fontSize: '104px',
  fontWeight: 900,
  letterSpacing: '-0.025em',
  paintOrder: 'stroke',
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};

export const CinematicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  const finishLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 85);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress < 100) return undefined;
    const delayTimer = setTimeout(finishLoading, 550);
    return () => clearTimeout(delayTimer);
  }, [progress, finishLoading]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        finishLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishLoading]);

  const statusIndex = Math.min(
    Math.floor((progress / 100) * LOADER_STATUSES.length),
    LOADER_STATUSES.length - 1,
  );
  // Rise smoothly from letter baseline (174) above letter cap top (46)
  const waterLevelY = 174 - (progress / 100) * 128;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -48,
        filter: 'blur(16px)',
      }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-gradient-to-br from-[#D5E6FF] via-[#EEF4FF] to-[#D4EEFF] dark:from-[#04060D] dark:via-[#070B16] dark:to-[#03050B] text-slate-900 dark:text-white overflow-hidden select-none"
    >
      {/* Subtle ambient glow (gradient-only, no grid texture) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-35 dark:opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 54%, rgba(16, 185, 129, 0.18), rgba(6, 182, 212, 0.14) 38%, transparent 72%)',
        }}
      />

      {/* Top Status & Skip Header */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[11px] tracking-wider text-slate-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#E6F536] animate-pulse" />
          <span className="text-slate-700 dark:text-neutral-300 font-semibold">PORTFOLIO // V2.0</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-slate-500 dark:text-neutral-500">
          <span>FILLING CONTAINER CORE</span>
          <span>&middot;</span>
          <span>FLUID DYNAMICS // ACTIVE</span>
        </div>

        <button
          type="button"
          onClick={finishLoading}
          className="text-slate-600 hover:text-slate-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer text-[10px] tracking-widest uppercase border border-slate-900/15 dark:border-white/15 px-2.5 py-1 rounded liquid-glass-well"
        >
          ESC TO SKIP
        </button>
      </div>

      {/* Center Liquid-Filled Name Tank */}
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[88%] md:max-w-[82%] lg:max-w-[940px] xl:max-w-[1080px] mx-auto px-2 flex flex-col items-center">
        <div className="relative w-full aspect-[1120/220]">
          <svg
            viewBox="0 0 1120 220"
            className="w-full h-full overflow-hidden select-none"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Prosun Banerjee loading progress"
          >
            <defs>
              <linearGradient id="water-surface-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E6F536" />
                <stop offset="35%" stopColor="#10B981" />
                <stop offset="70%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              <linearGradient id="water-deep-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="35%" stopColor="#06B6D4" />
                <stop offset="70%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#E6F536" />
              </linearGradient>

              <linearGradient id="water-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.42)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <filter id="water-meniscus-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id="prosun-letters-clip">
                <text
                  x="560"
                  y="115"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={TEXT_STYLE}
                >
                  PROSUN BANERJEE
                </text>
              </clipPath>
            </defs>

            {/* Empty Hollow Letter Container Outline */}
            <text
              x="560"
              y="115"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-900/[0.04] stroke-slate-900/20 dark:fill-white/[0.03] dark:stroke-white/25"
              strokeWidth="1.8"
              style={TEXT_STYLE}
            >
              PROSUN BANERJEE
            </text>

            {/* Clipped Dynamic Water Wave & Bubbles */}
            <g clipPath="url(#prosun-letters-clip)">
              <g
                style={{
                  transform: `translateY(${waterLevelY}px)`,
                  transition: 'transform 0.08s linear',
                }}
              >
                <g className="animate-water-back opacity-80">
                  <path d={`${BACK_WAVE_PATH} L 2160 400 L 0 400 Z`} fill="url(#water-deep-grad)" />
                </g>

                <g className="animate-water-front opacity-95">
                  <path d={`${FRONT_WAVE_PATH} L 2250 400 L 0 400 Z`} fill="url(#water-surface-grad)" />
                  <path
                    d={FRONT_WAVE_PATH}
                    fill="none"
                    stroke="#E6F536"
                    strokeWidth="5"
                    strokeOpacity="0.45"
                    filter="url(#water-meniscus-glow)"
                  />
                  <path
                    d={FRONT_WAVE_PATH}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.85"
                  />
                </g>

                <g>
                  <circle cx="150" cy="50" r="3.5" fill="rgba(255,255,255,0.7)" className="animate-bubble-1" />
                  <circle cx="340" cy="70" r="4.5" fill="rgba(230,245,54,0.75)" className="animate-bubble-2" />
                  <circle cx="520" cy="55" r="3.5" fill="rgba(255,255,255,0.65)" className="animate-bubble-3" />
                  <circle cx="710" cy="78" r="5" fill="rgba(6,182,212,0.75)" className="animate-bubble-1" />
                  <circle cx="880" cy="60" r="3.5" fill="rgba(255,255,255,0.8)" className="animate-bubble-2" />
                  <circle cx="1010" cy="72" r="4" fill="rgba(99,102,241,0.75)" className="animate-bubble-3" />
                </g>
              </g>

              <rect
                x="0"
                y="0"
                width="300"
                height="220"
                fill="url(#water-shimmer-grad)"
                className="animate-water-shimmer pointer-events-none"
              />
            </g>
          </svg>
        </div>

        {/* Sleek Gradient Progress Track */}
        <div className="w-full mt-4 h-[2.5px] bg-slate-900/10 dark:bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="h-full transition-[width] duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #E6F536 0%, #10B981 35%, #06B6D4 70%, #6366F1 100%)',
            }}
          />
        </div>

        {/* Status Message & Percentage Counter */}
        <div className="w-full mt-3 flex items-center justify-between font-mono text-[11px] sm:text-xs gap-4">
          <div className="min-h-[1.25rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="block text-slate-500 dark:text-neutral-500 tracking-wider truncate"
              >
                {LOADER_STATUSES[statusIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5 font-medium tracking-tight shrink-0">
            <span className="text-slate-500 dark:text-neutral-400 font-light">loading...</span>
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono min-w-[3ch] text-right tabular-nums">
              {progress}
            </span>
            <span className="text-emerald-600 dark:text-[#E6F536] font-mono text-sm font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-slate-500 dark:text-neutral-500 border-t border-slate-900/10 dark:border-white/5">
        <div>
          <span>&copy; 2026 PROSUN BANERJEE</span>
          <span className="hidden sm:inline text-slate-400 dark:text-neutral-600"> — C++ &amp; SECURITY SYSTEMS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-slate-600 dark:text-neutral-400">
            {progress >= 100 ? 'READY' : 'FILLING...'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CinematicLoader;
