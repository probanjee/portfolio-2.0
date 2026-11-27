import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activeSection = useScrollSpy(['dashboard', 'about', 'projects', 'achievements', 'skills', 'contact'], 180);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Skills', path: '/#skills' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3.5 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="liquid-glass-strong liquid-rim rounded-full px-4 sm:px-5 py-2 flex items-center justify-between transition-colors duration-300">
          {/* Brand Wordmark */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group py-1 pl-1"
          >
            <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-slate-900 dark:text-slate-100 uppercase transition-colors">
              PROSUN<span className="text-blue-600 dark:text-sky-400">.SEC</span>
            </span>
          </Link>

          {/* Desktop iOS Liquid Glass Tab Capsule */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full liquid-glass-well">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider font-mono rounded-full transition-colors ${
                    active
                      ? 'text-blue-700 dark:text-white'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/75 dark:bg-white/20 backdrop-blur-md border border-white/80 dark:border-white/30 shadow-[0_2px_10px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
              className="px-4 py-2 text-[11px] font-bold font-mono tracking-wider rounded-full liquid-btn-primary transition-[transform,box-shadow,background] duration-200 flex items-center cursor-pointer"
            >
              <span>LET&apos;S TALK</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2.5 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 transition-colors"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Liquid Glass Sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-2.5 p-3 liquid-glass-strong liquid-rim rounded-[24px] flex flex-col space-y-1.5 pointer-events-auto"
            >
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`text-left py-2.5 px-3.5 text-xs uppercase tracking-wider font-semibold font-mono rounded-2xl transition-colors flex justify-between items-center ${
                      active
                        ? 'bg-blue-500/12 dark:bg-white/12 text-blue-700 dark:text-white border border-blue-500/20 dark:border-white/15'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400" />}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-slate-900/10 dark:border-white/10">
                <button
                  onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
                  className="w-full text-center py-3 text-xs font-bold font-mono rounded-full liquid-btn-primary cursor-pointer"
                >
                  <span>LET&apos;S TALK</span>
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
