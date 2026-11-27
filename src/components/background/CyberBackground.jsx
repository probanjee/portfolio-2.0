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
        background: isDark
          ? 'linear-gradient(135deg, #020203 0%, #050507 40%, #0A0B0E 74%, #030304 100%)'
          : 'linear-gradient(135deg, #7E828B 0%, #8C9099 42%, #858992 75%, #797D86 100%)',
      }}
      aria-hidden="true"
    >
      {/* 1. Monochrome Atmospheric Blooms Behind Liquid Glass Surfaces */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[16%] -left-[10%] w-[64vw] h-[64vw] max-w-[900px] max-h-[900px] rounded-full blur-[120px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(161, 161, 170, 0.05) 42%, transparent 74%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.12) 48%, transparent 76%)',
          }}
        />
        <div
          className="absolute top-[14%] -right-[12%] w-[58vw] h-[58vw] max-w-[840px] max-h-[840px] rounded-full blur-[130px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(228, 228, 231, 0.07) 0%, rgba(113, 113, 122, 0.04) 48%, transparent 76%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, rgba(212, 212, 216, 0.10) 50%, transparent 76%)',
          }}
        />
        <div
          className="absolute -bottom-[20%] left-[18%] w-[60vw] h-[60vw] max-w-[860px] max-h-[860px] rounded-full blur-[130px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(63, 63, 70, 0.06) 52%, transparent 78%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(161, 161, 170, 0.14) 55%, transparent 78%)',
          }}
        />
      </div>

      {/* 2. Neutral Specular Cursor Wash (Desktop Only) */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="absolute w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle at center, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 48%, transparent 76%)'
              : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 76%)',
            willChange: 'transform',
          }}
        />
      )}

      {/* 3. Subtle Floating Monochrome Mist (Desktop) */}
      {!isMobile && (
        <motion.div
          animate={{
            x: [0, 36, -24, 0],
            y: [0, -28, 22, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[28%] left-[38%] w-[460px] h-[460px] rounded-full blur-[125px] pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(113, 113, 122, 0.04) 48%, transparent 74%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 74%)',
          }}
        />
      )}
    </div>
  );
};

export default CyberBackground;
