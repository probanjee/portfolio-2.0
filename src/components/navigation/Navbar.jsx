import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Shield, ExternalLink } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Watch key scroll viewports to drive link styling
  const activeSection = useScrollSpy(['dashboard', 'about', 'projects', 'skills', 'contact'], 180);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 90; // Align perfectly with header boundaries
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
        // Redirect to homepage anchor
        window.location.href = item.path;
      }
    } else if (item.path === '/') {
      setIsOpen(false);
      handleScrollTo('dashboard');
    }
  };

  // Resolve whether individual route items are active (using scroll spy as source of truth)
  const isItemActive = (item) => {
    const id = item.path === '/' ? 'dashboard' : item.path.replace('/#', '');
    return activeSection === id;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="glass-panel rounded-2xl border border-white/[0.03] dark:bg-[#02050D]/30 bg-white/60 backdrop-blur-premium px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 shadow-[0_8px_32px_0_rgba(2,5,13,0.3)]">
          
          {/* Logo Brand Frame */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/15 group-hover:border-brand-primary/30 transition-all duration-300 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]">
              <Shield className="w-4 h-4 text-brand-primary animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-200 dark:text-slate-100 uppercase">
                PROSUN<span className="text-brand-primary">.SEC</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`text-[10px] font-bold uppercase tracking-wider font-mono relative py-1 transition-all ${
                    active ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{item.name}</span>
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-brand-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Utilities Controls */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[#02050D]/40 border border-white/[0.04] text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Quick Action Contact Button */}
            <button
              onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
              className="px-4 py-2.5 text-[10px] font-bold font-mono tracking-wider text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] border border-brand-primary/10 transition-all duration-300 flex items-center space-x-1.5 pointer-events-auto cursor-pointer"
            >
              <span>LET'S TALK</span>
            </button>
          </div>

          {/* Mobile Navigation Toggles */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[#02050D]/40 border border-white/[0.04] text-slate-400 transition-colors"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-[#02050D]/40 border border-white/[0.04] text-slate-400 transition-colors"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-4 glass-panel rounded-2xl border border-white/[0.04] bg-[#02050D]/90 backdrop-blur-premium flex flex-col space-y-3 shadow-[0_8px_32px_0_rgba(2,5,13,0.4)] pointer-events-auto"
            >
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`text-left py-2 px-3 text-[10px] uppercase tracking-wider font-semibold font-mono rounded-xl transition-all flex justify-between items-center ${
                      active ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-white/[0.04]">
                <button
                  onClick={() => handleNavClick({ name: 'Contact', path: '/#contact' })}
                  className="w-full text-center py-3 text-[10px] font-bold font-mono text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>LET'S TALK</span>
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
