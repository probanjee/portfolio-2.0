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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3.5 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="liquid-glass-strong liquid-rim rounded-full px-4 sm:px-5 py-2 flex items-center justify-between transition-colors duration-300">
          {/* Brand Wordmark */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group py-1 pl-1"
          >
            <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-zinc-950 dark:text-white uppercase transition-colors">
              PROSUN<span className="text-zinc-800/80 dark:text-zinc-300">.SEC</span>
            </span>
          </Link>

          {/* Desktop iOS Liquid Glass Tab Capsule */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full liquid-glass-well liquid-rim">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-2.5 xl:px-3.5 py-1.5 text-[10px] xl:text-[11px] font-semibold uppercase tracking-wider font-mono rounded-full transition-colors whitespace-nowrap ${
                    active
                      ? 'text-zinc-950 dark:text-white font-bold'
                      : 'text-zinc-900 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-white/40 to-white/55 dark:from-white/25 dark:via-white/10 dark:to-white/18 backdrop-blur-md border border-white/90 dark:border-white/55 shadow-[0_3px_10px_rgba(0,0,0,0.16),inset_0_1.5px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.55),inset_0_1.5px_1px_rgba(255,255,255,0.45)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            <button
              onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
              className="px-4 py-2 text-[11px] font-bold font-mono tracking-wider rounded-full liquid-btn-primary liquid-rim transition-[transform,box-shadow,background] duration-200 flex items-center cursor-pointer"
            >
              <span className="relative z-10">LET&apos;S TALK</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2.5 lg:hidden">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2.5 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white transition-colors"
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
              className="lg:hidden mt-2.5 p-3 liquid-glass-strong liquid-rim rounded-[24px] flex flex-col space-y-1.5 pointer-events-auto"
            >
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`text-left py-2.5 px-3.5 text-xs uppercase tracking-wider font-semibold font-mono rounded-2xl transition-colors flex justify-between items-center ${
                      active
                        ? 'liquid-glass-well liquid-rim text-zinc-950 dark:text-white'
                        : 'text-zinc-900 dark:text-zinc-200 hover:bg-white/25 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-zinc-950/20 dark:border-white/20">
                <button
                  onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
                  className="w-full text-center py-3 text-xs font-bold font-mono rounded-full liquid-btn-primary liquid-rim cursor-pointer"
                >
                  <span className="relative z-10">LET&apos;S TALK</span>
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
