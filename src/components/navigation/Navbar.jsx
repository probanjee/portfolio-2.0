import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import ThemeToggle from '../ui/ThemeToggle';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activeSection = useScrollSpy(['dashboard', 'about', 'projects', 'achievements', 'skills', 'certification', 'contact'], 180);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Certification', path: '/#certification' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (item) => {
    if (item.path.startsWith('/#')) {
      const id = item.path.replace('/#', '');
      if (location.pathname === '/') {
        handleScrollTo(id);
      } else {
        window.location.href = item.path;
      }
    } else if (item.path === '/') {
      setIsOpen(false);
      handleScrollTo('dashboard');
    }
  };

  const isItemActive = (item) => {
    const id = item.path === '/' ? 'dashboard' : item.path.replace('/#', '');
    return activeSection === id;
  };

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="liquid-glass-strong rounded-full px-4 sm:px-5 py-2 flex items-center justify-between gap-3 transition-colors duration-300">
          {/* Brand Wordmark (text only) */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center py-1 pl-1 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
          >
            <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#17202B] dark:text-[#F4F6F8] uppercase transition-colors">
              PROSUN<span className="text-[#087F79] dark:text-[#55D6C8]">.SEC</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (single clean surface without nested outline) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider font-mono rounded-full transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] ${
                    active
                      ? 'bg-[#087F79]/15 text-[#087F79] border border-[#087F79]/30 dark:bg-[#55D6C8]/15 dark:text-[#55D6C8] dark:border-[#55D6C8]/35'
                      : 'text-[#5B6573] hover:text-[#17202B] hover:bg-[#E8EDF1]/80 dark:text-[#A7B0BC] dark:hover:text-[#F4F6F8] dark:hover:bg-[#1D242E]/80 border border-transparent'
                  }`}
                >
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />

            <button
              type="button"
              onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
              className="px-4 py-2 text-[11px] font-bold font-mono tracking-wider rounded-full liquid-btn-primary transition-[transform,box-shadow,background] duration-200 flex items-center cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F5F7] dark:focus-visible:ring-offset-[#0B0D10]"
            >
              <span>Let&apos;s Talk</span>
            </button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-9 h-9 rounded-full liquid-glass-well text-[#17202B] dark:text-[#F4F6F8] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              {isOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Tablet & Mobile Navigation Sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2.5 p-3 liquid-glass-strong rounded-2xl flex flex-col space-y-1 pointer-events-auto"
            >
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    aria-current={active ? 'page' : undefined}
                    className={`text-left py-2.5 px-3.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold font-mono rounded-xl transition-colors flex justify-between items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] ${
                      active
                        ? 'bg-[#087F79]/15 text-[#087F79] border border-[#087F79]/30 dark:bg-[#55D6C8]/15 dark:text-[#55D6C8] dark:border-[#55D6C8]/35'
                        : 'text-[#5B6573] dark:text-[#A7B0BC] hover:text-[#17202B] dark:hover:text-[#F4F6F8] hover:bg-[#E8EDF1]/80 dark:hover:bg-[#1D242E]/80 border border-transparent'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="text-[10px] font-mono">Active</span>}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-[#17202B]/10 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
                  className="w-full text-center py-2.5 min-h-[44px] text-xs font-bold font-mono rounded-full liquid-btn-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
                >
                  <span>Let&apos;s Talk</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
