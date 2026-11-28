import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * Calm frosted theme switch:
 * - Light mode: Sun icon knob on the left, "Light" label on the right.
 * - Dark mode: "Dark" label on the left, Moon icon knob on the right.
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
      className={`group relative inline-flex items-center justify-between rounded-full cursor-pointer select-none border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F5F7] dark:focus-visible:ring-offset-[#0B0D10] ${
        compact ? 'h-9 w-[92px]' : 'h-9 w-[100px]'
      } ${
        isDark
          ? 'flex-row-reverse py-[3px] pl-2.5 pr-[3px] bg-[#1D242E] border-white/10 text-[#F4F6F8] hover:border-[#55D6C8]/40'
          : 'flex-row py-[3px] pl-[3px] pr-2.5 bg-[#E8EDF1] border-[#17202B]/15 text-[#17202B] hover:border-[#087F79]/40'
      }`}
    >
      <motion.span
        layout="position"
        transition={{ type: 'spring', stiffness: 440, damping: 32 }}
        className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
          isDark
            ? 'bg-[#151A22] text-[#55D6C8] border border-white/10 shadow-sm'
            : 'bg-white text-[#087F79] border border-[#17202B]/10 shadow-sm'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <Sun className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </motion.span>
      <span className="flex-1 text-center font-mono text-[11px] font-semibold tracking-wider px-1">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;
