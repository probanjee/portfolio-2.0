import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

import CyberBackground from './components/background/CyberBackground';
import CinematicLoader from './components/loader/CinematicLoader';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

export const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <CinematicLoader onComplete={() => setLoading(false)} />
        ) : (
          <Router>
            <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-brand-primary/30 select-none">
              {/* Core Theme-Aware Tech Background */}
              <CyberBackground />

              {/* Header Navigation overlay */}
              <Navbar />

              {/* Main routing area */}
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16">
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
              <footer className="mt-20 border-t border-white/5 bg-[#02050D]/30 backdrop-blur-premium py-10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* Left segment */}
                  <div className="text-center md:text-left space-y-1">
                    <span className="font-mono text-xs font-black tracking-widest text-slate-400 flex items-center justify-center md:justify-start space-x-1">
                      <span className="text-brand-primary font-black">&lt;</span>
                      <span className="text-slate-100">probanjee.dev</span>
                      <span className="text-brand-primary font-black">/&gt;</span>
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Designed, developed & maintained by probanjee. &copy; 2026.
                    </p>
                  </div>

                  {/* Right social shortcuts */}
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/probanjee" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4 text-slate-500" />
                    </a>
                    <a 
                      href="https://linkedin.com/in/prosun-banerjee-545942293" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://leetcode.com/u/Prosun01/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all"
                      title="LeetCode"
                      aria-label="LeetCode Profile"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-4 h-4 fill-current" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-6.477-6.556c-.039-.035-.078-.065-.117-.1l.039-.038L15.35 4.906c.646-.646.646-1.706 0-2.352l-2.396-2.392A1.374 1.374 0 0 0 13.483 0zm5.138 6.13c-.027 0-.053 0-.08.003L14.71 6.549l2.457 2.457 2.397-2.392c.54-.54.54-1.414 0-1.954l-1.077-1.077c-.367-.367-.852-.454-1.309-.454zM7.28 10.395l-3.21 3.447c-.636.683-.636 1.83 0 2.513l3.21 3.447 2.128-2.128-1.547-1.636c-.367-.367-.367-.96 0-1.327l1.547-1.636z"/>
                      </svg>
                    </a>
                    <a 
                      href="mailto:prosunbanerjee8@gmail.com"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all"
                      title="Email Secure Interface"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>

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
