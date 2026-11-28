import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const BACK_WAVE_PATH =
  'M 0 0 C 60 -10, 120 10, 180 0 C 240 -10, 300 10, 360 0 C 420 -10, 480 10, 540 0 C 600 -10, 660 10, 720 0 C 780 -10, 840 10, 900 0 C 960 -10, 1020 10, 1080 0 C 1140 -10, 1200 10, 1260 0 C 1320 -10, 1380 10, 1440 0 C 1500 -10, 1560 10, 1620 0 C 1680 -10, 1740 10, 1800 0 C 1860 -10, 1920 10, 1980 0 C 2040 -10, 2100 10, 2160 0';

const FRONT_WAVE_PATH =
  'M 0 0 C 75 14, 150 -14, 225 0 C 300 14, 375 -14, 450 0 C 525 14, 600 -14, 675 0 C 750 14, 825 -14, 900 0 C 975 14, 1050 -14, 1125 0 C 1200 14, 1275 -14, 1350 0 C 1425 14, 1500 -14, 1575 0 C 1650 14, 1725 -14, 1800 0 C 1875 14, 1950 -14, 2025 0 C 2100 14, 2175 -14, 2250 0';

const TEXT_STYLE = {
  fontSize: '104px',
  fontWeight: 900,
  letterSpacing: '-0.025em',
  paintOrder: 'stroke',
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
};

export const CinematicLoader = ({ onComplete }) => {
  const { isDark } = useTheme();
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

  // Rise smoothly from letter baseline (174) above letter cap top (46)
  const waterLevelY = 174 - (progress / 100) * 128;

  const palette = isDark
    ? {
        surfaceGradStart: '#2EC4B6',
        surfaceGradMid: '#55D6C8',
        surfaceGradEnd: '#89E6DC',
        deepGradStart: '#134E4A',
        deepGradMid: '#1B7A72',
        deepGradEnd: '#2BB5A7',
        meniscusGlow: '#55D6C8',
        meniscusEdge: '#C6F7F2',
        bubbleFill: 'rgba(244, 246, 248, 0.72)',
        shimmerMid: 'rgba(255, 255, 255, 0.30)',
        letterEmptyFill: '#151A22',
        letterOutlineStroke: 'rgba(85, 214, 200, 0.36)',
        ambientGlow:
          'radial-gradient(circle at 50% 52%, rgba(85, 214, 200, 0.08), rgba(21, 26, 34, 0.38) 42%, transparent 74%)',
        progressFill: 'linear-gradient(90deg, rgba(85, 214, 200, 0.45) 0%, #55D6C8 100%)',
      }
    : {
        surfaceGradStart: '#065F5B',
        surfaceGradMid: '#087F79',
        surfaceGradEnd: '#0E9F98',
        deepGradStart: '#134E4A',
        deepGradMid: '#0F766E',
        deepGradEnd: '#087F79',
        meniscusGlow: '#0E9F98',
        meniscusEdge: '#55D6C8',
        bubbleFill: 'rgba(243, 245, 247, 0.70)',
        shimmerMid: 'rgba(255, 255, 255, 0.28)',
        letterEmptyFill: '#E8EDF1',
        letterOutlineStroke: 'rgba(8, 127, 121, 0.35)',
        ambientGlow:
          'radial-gradient(circle at 50% 52%, rgba(8, 127, 121, 0.075), rgba(232, 237, 241, 0.65) 44%, transparent 76%)',
        progressFill: 'linear-gradient(90deg, rgba(8, 127, 121, 0.45) 0%, #087F79 100%)',
      };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -36,
        filter: 'blur(12px)',
      }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#F3F5F7] dark:bg-[#0B0D10] text-[#17202B] dark:text-[#F4F6F8] overflow-hidden select-none transition-colors duration-300"
    >
      {/* Calm teal-tinted ambient atmosphere matching CyberBackground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: palette.ambientGlow }}
      />

      {/* Top balance spacer */}
      <div aria-hidden="true" className="h-12 sm:h-16" />

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
                <stop offset="0%" stopColor={palette.surfaceGradStart} />
                <stop offset="50%" stopColor={palette.surfaceGradMid} />
                <stop offset="100%" stopColor={palette.surfaceGradEnd} />
              </linearGradient>

              <linearGradient id="water-deep-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={palette.deepGradStart} />
                <stop offset="50%" stopColor={palette.deepGradMid} />
                <stop offset="100%" stopColor={palette.deepGradEnd} />
              </linearGradient>

              <linearGradient id="water-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={palette.shimmerMid} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <filter id="water-meniscus-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
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

            {/* Clean Architectural Letter Tank Base (opaque fill hides internal font contour overlaps) */}
            <text
              x="560"
              y="115"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={palette.letterEmptyFill}
              stroke={palette.letterOutlineStroke}
              strokeWidth="1.8"
              style={TEXT_STYLE}
            >
              PROSUN BANERJEE
            </text>

            {/* Clipped Dynamic Teal Liquid Wave & Bubbles */}
            <g clipPath="url(#prosun-letters-clip)">
              <g
                style={{
                  transform: `translateY(${waterLevelY}px)`,
                  transition: 'transform 0.08s linear',
                }}
              >
                <g className="animate-water-back opacity-85">
                  <path d={`${BACK_WAVE_PATH} L 2160 400 L 0 400 Z`} fill="url(#water-deep-grad)" />
                </g>

                <g className="animate-water-front opacity-95">
                  <path d={`${FRONT_WAVE_PATH} L 2250 400 L 0 400 Z`} fill="url(#water-surface-grad)" />
                  <path
                    d={FRONT_WAVE_PATH}
                    fill="none"
                    stroke={palette.meniscusGlow}
                    strokeWidth="4"
                    strokeOpacity="0.38"
                    filter="url(#water-meniscus-glow)"
                  />
                  <path
                    d={FRONT_WAVE_PATH}
                    fill="none"
                    stroke={palette.meniscusEdge}
                    strokeWidth="1.75"
                    strokeOpacity="0.82"
                  />
                </g>

                <g>
                  <circle cx="150" cy="50" r="3" fill={palette.bubbleFill} className="animate-bubble-1" />
                  <circle cx="340" cy="70" r="4" fill={palette.bubbleFill} className="animate-bubble-2" />
                  <circle cx="520" cy="55" r="3" fill={palette.bubbleFill} className="animate-bubble-3" />
                  <circle cx="710" cy="78" r="4.5" fill={palette.bubbleFill} className="animate-bubble-1" />
                  <circle cx="880" cy="60" r="3" fill={palette.bubbleFill} className="animate-bubble-2" />
                  <circle cx="1010" cy="72" r="3.5" fill={palette.bubbleFill} className="animate-bubble-3" />
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

        {/* Sleek Teal Progress Track */}
        <div className="w-full mt-4 h-[3px] bg-[#E8EDF1] dark:bg-[#1D242E] border border-[#17202B]/10 dark:border-white/10 relative overflow-hidden rounded-full">
          <div
            className="h-full transition-[width] duration-100 ease-out rounded-full"
            style={{
              width: `${progress}%`,
              background: palette.progressFill,
            }}
          />
        </div>

        {/* Clean Percentage Counter */}
        <div className="w-full mt-3 flex items-center justify-end font-mono text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 font-medium tracking-tight shrink-0">
            <span className="text-[#5B6573] dark:text-[#A7B0BC] font-normal">loading...</span>
            <span className="text-base sm:text-lg font-bold text-[#17202B] dark:text-[#F4F6F8] font-mono min-w-[3ch] text-right tabular-nums">
              {progress}
            </span>
            <span className="text-[#087F79] dark:text-[#55D6C8] font-mono text-sm font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Clean Footer Line */}
      <div className="relative z-10 w-full px-6 sm:px-12 py-6 flex items-center justify-start font-mono text-[10px] sm:text-[11px] tracking-widest text-[#5B6573] dark:text-[#A7B0BC] border-t border-[#17202B]/10 dark:border-white/[0.08]">
        <div>
          <span className="text-[#17202B] dark:text-[#F4F6F8] font-semibold">&copy; 2026 PROSUN BANERJEE</span>
          <span className="hidden sm:inline"> — C++ &amp; SECURITY SYSTEMS</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CinematicLoader;
