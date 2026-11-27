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
            <div className="relative min-h-screen text-zinc-950 dark:text-white flex flex-col justify-between selection:bg-white/30">
              {/* Core Theme-Aware Crystal Liquid Glass Background */}
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
              <footer className="mt-20 border-t border-white/45 dark:border-white/20 liquid-glass-strong pt-10 pb-24 sm:pb-10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* Left segment */}
                  <div className="text-center md:text-left space-y-1">
                    <span className="font-mono text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-200 flex items-center justify-center md:justify-start space-x-1">
                      <span className="text-zinc-950 dark:text-white font-bold">&lt;</span>
                      <span className="text-zinc-950 dark:text-white">probanjee.dev</span>
                      <span className="text-zinc-950 dark:text-white font-bold">/&gt;</span>
                    </span>
                    <p className="text-[11px] text-zinc-900 dark:text-zinc-300 font-mono font-medium">
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
