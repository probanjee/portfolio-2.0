import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CyberBackground = () => {
  const mouse = useMousePosition();
  const glowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen width for mobile optimization
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync mouse glow on desktop only for maximized GPU processing speeds
  useEffect(() => {
    if (!isMobile && glowRef.current) {
      glowRef.current.style.transform = `translate3d(${mouse.x - 250}px, ${mouse.y - 250}px, 0)`;
    }
  }, [mouse, isMobile]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#02050D] transition-colors duration-700 light:bg-slate-50">
      
      {/* 1. Animated Liquid Mesh Gradients (Desktop Only) */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none blur-[140px] animate-[pulse_10s_ease-in-out_infinite]">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/15 animate-[spin_40s_linear_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-gradient-to-l from-brand-accent/10 to-brand-primary/15 animate-[spin_30s_linear_infinite]" style={{ animationDirection: 'reverse' }} />
        </div>
      )}

      {/* 2. Precision Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045] transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(59, 130, 246, 0.45) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px, 48px 48px',
        }}
      />

      {/* 3. Scanline/Vignette Shadow Filters */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#02050D]/20 via-transparent to-[#02050D]/90 dark:to-[#02050D] opacity-80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,5,13,0.7)_80%)]" />

      {/* 4. Interactive Cursor Ambient Spotlight (Desktop Only, disabled on mobile to boost scroll speed) */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-25 dark:opacity-40 pointer-events-none transition-opacity duration-500 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 100%)',
            willChange: 'transform',
          }}
        />
      )}

      {/* 5. Fluid Floating Blobs (Framer Motion orchestrated float vectors, simplified on mobile) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Blob A - Indigo Bubble */}
        <motion.div
          animate={isMobile ? { y: [-10, 10, -10] } : {
            x: [0, 40, -30, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: isMobile ? 8 : 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-brand-primary/10 dark:bg-brand-primary/4 blur-[130px] mix-blend-screen"
        />

        {/* Blob B - Violet Bubble */}
        <motion.div
          animate={isMobile ? { y: [15, -15, 15] } : {
            x: [0, -50, 40, 0],
            y: [0, 80, -50, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            duration: isMobile ? 10 : 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-60 -right-40 w-[550px] h-[550px] rounded-full bg-brand-secondary/10 dark:bg-brand-secondary/4 blur-[150px] mix-blend-screen"
        />

        {/* Blob C - Cyan Spark (Hidden on mobile to save GPU cycles) */}
        {!isMobile && (
          <motion.div
            animate={{
              x: [0, 60, -50, 0],
              y: [0, 50, -60, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-1/2 left-2/3 w-[350px] h-[350px] rounded-full bg-brand-accent/5 blur-[120px] mix-blend-screen"
          />
        )}
      </div>

    </div>
  );
};

export default CyberBackground;
