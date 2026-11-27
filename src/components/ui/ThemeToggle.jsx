import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * Tactile Apple-style Liquid Glass capsule toggle with an overhanging
 * refractive spherical lens knob for switching Light and Dark modes.
 */
export const ThemeToggle = ({ isDark, onToggle, compact = false }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex items-center rounded-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all duration-300 ${
        compact ? 'h-8 w-[84px]' : 'h-9 w-[96px]'
      } ${isDark ? 'justify-end' : 'justify-start'}`}
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(18, 18, 22, 0.72) 52%, rgba(255, 255, 255, 0.08) 100%)'
          : 'linear-gradient(180deg, rgba(164, 168, 178, 0.72) 0%, rgba(126, 130, 140, 0.78) 54%, rgba(154, 158, 168, 0.68) 100%)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.34)' : '1px solid rgba(255, 255, 255, 0.58)',
        boxShadow: isDark
          ? 'inset 0 1.5px 2px rgba(255, 255, 255, 0.28), inset 0 -1.5px 2px rgba(255, 255, 255, 0.18), 0 8px 20px -4px rgba(0, 0, 0, 0.75)'
          : 'inset 0 1.5px 2px rgba(255, 255, 255, 0.68), inset 0 -1.5px 2px rgba(255, 255, 255, 0.35), 0 8px 22px -4px rgba(255, 255, 255, 0.28), 0 6px 14px -4px rgba(15, 18, 25, 0.26)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      }}
    >
      {/* Mode Text Inside Frosted Capsule */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 flex items-center font-sans font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)] transition-all duration-300 ${
          compact ? 'text-[11px]' : 'text-xs'
        } ${isDark ? 'left-3.5 pr-9' : 'right-3.5 pl-9'}`}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>

      {/* Overhanging Spherical Refractive Liquid Glass Droplet Knob */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 460, damping: 32 }}
        className={`relative z-10 flex items-center justify-center rounded-full shrink-0 ${
          compact ? 'w-[38px] h-[38px]' : 'w-[42px] h-[42px]'
        } ${isDark ? '-mr-0.5' : '-ml-0.5'}`}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 42% at 50% 100%, rgba(255, 255, 255, 0.34), transparent 72%), radial-gradient(ellipse 68% 36% at 50% 4%, rgba(255, 255, 255, 0.38), transparent 70%), linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(20, 20, 26, 0.38) 55%, rgba(255, 255, 255, 0.16) 100%)'
            : 'radial-gradient(ellipse 70% 42% at 50% 100%, rgba(255, 255, 255, 0.52), transparent 72%), radial-gradient(ellipse 68% 36% at 50% 4%, rgba(255, 255, 255, 0.58), transparent 70%), linear-gradient(160deg, rgba(255, 255, 255, 0.34) 0%, rgba(160, 165, 175, 0.16) 55%, rgba(255, 255, 255, 0.24) 100%)',
          border: '1.25px solid rgba(255, 255, 255, 0.78)',
          boxShadow: isDark
            ? 'inset 0 2px 3px rgba(255, 255, 255, 0.68), inset 0 -2px 3px rgba(255, 255, 255, 0.35), 0 6px 16px rgba(0, 0, 0, 0.65)'
            : 'inset 0 2px 3px rgba(255, 255, 255, 0.88), inset 0 -2px 3px rgba(255, 255, 255, 0.45), 0 6px 16px rgba(15, 18, 25, 0.25)',
          backdropFilter: 'blur(12px) brightness(1.12)',
          WebkitBackdropFilter: 'blur(12px) brightness(1.12)',
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
        ) : (
          <Sun className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
        )}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
