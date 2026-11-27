import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

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
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <CinematicLoader onComplete={() => setLoading(false)} />
          ) : (
            <Router>
              <div className="relative min-h-screen text-[#17202B] dark:text-[#F4F6F8] flex flex-col justify-between selection:bg-[#087F79]/20 dark:selection:bg-[#55D6C8]/25">
                {/* Calm Glass Background */}
                <CyberBackground />

                {/* Header Navigation */}
                <Navbar />

                {/* Prosenjit AI Assistant */}
                <ProsenjitChatbot />

                {/* Main routing area */}
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 sm:pt-20 pb-8 sm:pb-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects/:id" element={<ProjectDetails />} />
                      <Route path="/project/:id" element={<ProjectDetails />} />
                    </Routes>
                  </motion.div>
                </main>

                {/* Footer Section */}
                <footer className="mt-16 border-t border-[#17202B]/10 dark:border-white/[0.08] bg-[#FFFFFF]/80 dark:bg-[#151A22]/85 backdrop-blur-lg py-10 pb-24 sm:pb-10 transition-colors">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Left segment */}
                    <div className="text-center md:text-left space-y-1">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#5B6573] dark:text-[#A7B0BC] flex items-center justify-center md:justify-start space-x-1">
                        <span className="text-[#087F79] dark:text-[#55D6C8] font-bold">&lt;</span>
                        <span className="text-[#17202B] dark:text-[#F4F6F8]">probanjee.dev</span>
                        <span className="text-[#087F79] dark:text-[#55D6C8] font-bold">/&gt;</span>
                      </span>
                      <p className="text-[11px] text-[#5B6573] dark:text-[#A7B0BC] font-mono">
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
    </MotionConfig>
  );
};

export default App;
