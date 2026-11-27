import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * Calm frosted theme switch pairing crisp visual icon, status text,
 * and accessible teal focus rings inside Navbar proportions.
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
      className={`group relative inline-flex items-center rounded-full cursor-pointer select-none border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F5F7] dark:focus-visible:ring-offset-[#0B0D10] ${
        compact ? 'h-9 px-2.5 gap-1.5' : 'h-9 px-3 gap-2'
      } bg-[#E8EDF1] border-[#17202B]/12 text-[#17202B] hover:border-[#087F79]/40 dark:bg-[#1D242E] dark:border-white/10 dark:text-[#F4F6F8] dark:hover:border-[#55D6C8]/40`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${
          isDark
            ? 'bg-[#151A22] text-[#55D6C8] border border-white/10'
            : 'bg-white text-[#087F79] border border-[#17202B]/10 shadow-sm'
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" aria-hidden="true" /> : <Sun className="w-3.5 h-3.5" aria-hidden="true" />}
      </motion.span>
      <span className="font-mono text-[11px] font-semibold tracking-wider">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;
