import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useTheme } from '../../hooks/useTheme';

export const CyberBackground = () => {
  const mouse = useMousePosition();
  const { isDark } = useTheme();
  const glowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile && glowRef.current) {
      glowRef.current.style.transform = `translate3d(${mouse.x - 260}px, ${mouse.y - 260}px, 0)`;
    }
  }, [mouse, isMobile]);

  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden transition-colors duration-500"
      style={{
        background: isDark ? '#0B0D10' : '#F3F5F7',
      }}
      aria-hidden="true"
    >
      {/* 1. Calm Atmospheric Teal Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[18%] -left-[12%] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full blur-[130px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(85, 214, 200, 0.055) 0%, rgba(21, 26, 34, 0.25) 45%, transparent 74%)'
              : 'radial-gradient(circle, rgba(8, 127, 121, 0.055) 0%, rgba(232, 237, 241, 0.45) 50%, transparent 76%)',
          }}
        />
        <div
          className="absolute top-[18%] -right-[14%] w-[54vw] h-[54vw] max-w-[760px] max-h-[760px] rounded-full blur-[140px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(29, 36, 46, 0.35) 0%, rgba(85, 214, 200, 0.03) 50%, transparent 76%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.70) 0%, rgba(8, 127, 121, 0.035) 50%, transparent 76%)',
          }}
        />
      </div>

      {/* 2. Restrained Specular Cursor Wash (Desktop Only) */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="absolute w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle at center, rgba(85, 214, 200, 0.05) 0%, transparent 72%)'
              : 'radial-gradient(circle at center, rgba(8, 127, 121, 0.045) 0%, transparent 72%)',
            willChange: 'transform',
          }}
        />
      )}

      {/* 3. Static Calm Subtle Horizon Mist (Reduced-motion friendly) */}
      {!isMobile && (
        <motion.div
          animate={{
            x: [0, 18, -12, 0],
            y: [0, -14, 10, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[34%] left-[40%] w-[420px] h-[420px] rounded-full blur-[135px] pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(85, 214, 200, 0.035) 0%, transparent 74%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 74%)',
          }}
        />
      )}
    </div>
  );
};

export default CyberBackground;
