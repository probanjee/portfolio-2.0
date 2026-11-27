import { useState, useEffect } from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    if (root.classList.contains('light')) return 'light';
    if (root.classList.contains('dark')) return 'dark';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  }
  return 'dark';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const syncTheme = (event) => {
      const next = event?.detail;
      if (next === 'dark' || next === 'light') {
        setTheme((prev) => (prev === next ? prev : next));
      }
    };
    window.addEventListener('theme-change', syncTheme);
    return () => window.removeEventListener('theme-change', syncTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};
