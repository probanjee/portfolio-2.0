import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';

import CyberBackground from './components/background/CyberBackground';
import CinematicLoader from './components/loader/CinematicLoader';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import ProsenjitChatbot from './components/chatbot/ProsenjitChatbot';
import SocialLinks from './components/ui/SocialLinks';

export const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <CinematicLoader onComplete={() => setLoading(false)} />
        ) : (
          <Router>
            <div className="relative min-h-screen text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-brand-primary/25">
              {/* Core Theme-Aware Liquid Glass Background */}
              <CyberBackground />

              {/* Header Navigation overlay */}
              <Navbar />

              {/* Prosenjit AI Assistant Floating Chatbot */}
              <ProsenjitChatbot />

              {/* Main routing area */}
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                  </Routes>
                </motion.div>
              </main>

              {/* Footer Section */}
              <footer className="mt-20 border-t border-white/60 dark:border-white/15 bg-white/40 dark:bg-white/[0.06] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.20)] pt-10 pb-24 sm:pb-10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* Left segment */}
                  <div className="text-center md:text-left space-y-1">
                    <span className="font-mono text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start space-x-1">
                      <span className="text-blue-600 dark:text-brand-primary font-bold">&lt;</span>
                      <span className="text-slate-900 dark:text-slate-100">probanjee.dev</span>
                      <span className="text-blue-600 dark:text-brand-primary font-bold">/&gt;</span>
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Designed, developed &amp; maintained by probanjee. &copy; 2026.
                    </p>
                  </div>

                  {/* Right social shortcuts */}
                  <SocialLinks />

                </div>
              </footer>

            </div>
          </Router>
        )}
      </AnimatePresence>
    </ReactLenis>
  );
};

export default App;
