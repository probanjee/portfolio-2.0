import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "INITIALIZING SECURE ARCHITECTURE ENCLAVE...",
    "ESTABLISHING CRYPTOGRAPHIC TLS PIPELINES...",
    "COMPILING AMBIENT METRICS LAYER...",
    "DECRYPTING FULL-STACK INTERACTION SCHEMAS...",
    "ESTABLISHING TRANS-TEMPORAL GATEWAY PORTAL..."
  ];

  useEffect(() => {
    // Randomized step timer simulating real-time secure compiling sequence
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 11) + 4; // Faster, more cinematic load
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const segment = 100 / statuses.length;
    const currentSegmentIndex = Math.min(
      Math.floor(progress / segment),
      statuses.length - 1
    );
    setStatusIndex(currentSegmentIndex);

    if (progress === 100) {
      const delayTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 900); // Slight delay for the final confirmation log
      return () => clearTimeout(delayTimer);
    }
  }, [progress, onComplete, statuses.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100,
        filter: "blur(20px)"
      }}
      transition={{ 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02050D] font-mono text-xs overflow-hidden select-none"
    >
      {/* Grid Pattern Texture inside Loader */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cyber Security Scanline FX */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px]" />

      <div className="w-full max-w-sm px-8 relative z-10 space-y-10">
        
        {/* Animated Cyber Shield Logo Asset */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: 1,
              rotateY: [0, 180, 180, 360]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="relative p-4 rounded-3xl border border-brand-primary/10 bg-brand-primary/5 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.05)]"
          >
            {/* Double Shield Path SVG */}
            <svg className="w-12 h-12 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 18s5-2.5 5-6.5V7l-5-2-5 2v4.5c0 4 5 6.5 5 6.5z" className="text-brand-secondary/40" />
            </svg>
            
            {/* Glowing Ring Animation */}
            <div className="absolute inset-0 rounded-3xl bg-brand-primary/15 filter blur-lg animate-pulse" />
          </motion.div>
        </div>

        {/* Loading details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-slate-500 text-[10px] tracking-widest uppercase font-semibold">
            <span>SECURE SYSTEM LOAD</span>
            <span className="text-brand-primary font-bold">{progress}%</span>
          </div>

          {/* Frosted Progress bar background */}
          <div className="h-[2px] w-full bg-slate-950 overflow-hidden relative rounded-full border border-white/[0.02]">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>

          {/* Compiling live terminal outputs */}
          <div className="h-6 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={statusIndex}
                initial={{ y: 15, opacity: 0, filter: "blur(2px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-slate-500 font-medium tracking-wide flex items-center space-x-2 font-mono text-[10px] sm:text-xs"
              >
                <span className="text-brand-primary animate-pulse">▶</span>
                <span className="text-slate-400 select-all">{statuses[statusIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Local connection spec stats */}
        <div className="pt-4 border-t border-slate-900/60 flex justify-between text-[9px] text-slate-600 tracking-widest font-mono">
          <span>HOST::SECURE_SSL</span>
          <span>PORT_LOCAL::5173</span>
          <span>TRANSMIT::OK</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CinematicLoader;
