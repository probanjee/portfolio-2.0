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
          ? 'linear-gradient(135deg, #020308 0%, #050914 38%, #0A1022 72%, #03060E 100%)'
          : 'linear-gradient(135deg, #D5E6FF 0%, #EEF4FF 38%, #E1E7FF 72%, #D4EEFF 100%)',
      }}
      aria-hidden="true"
    >
      {/* 1. Deep Dark-Toned Gradient Blooms (dark obsidian/midnight tones in dark mode, daylight sky in light mode) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[18%] -left-[12%] w-[64vw] h-[64vw] max-w-[880px] max-h-[880px] rounded-full blur-[120px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(29, 78, 216, 0.16) 0%, rgba(15, 23, 42, 0.25) 48%, transparent 74%)'
              : 'radial-gradient(circle, rgba(96, 165, 250, 0.45) 0%, rgba(147, 197, 253, 0.28) 48%, transparent 76%)',
          }}
        />
        <div
          className="absolute top-[18%] -right-[14%] w-[58vw] h-[58vw] max-w-[820px] max-h-[820px] rounded-full blur-[130px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(49, 46, 129, 0.16) 0%, rgba(15, 23, 42, 0.22) 52%, transparent 76%)'
              : 'radial-gradient(circle, rgba(165, 180, 252, 0.48) 0%, rgba(196, 181, 253, 0.28) 50%, transparent 76%)',
          }}
        />
        <div
          className="absolute -bottom-[22%] left-[18%] w-[60vw] h-[60vw] max-w-[840px] max-h-[840px] rounded-full blur-[130px] transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(15, 41, 90, 0.22) 0%, rgba(2, 6, 23, 0.35) 55%, transparent 78%)'
              : 'radial-gradient(circle, rgba(103, 232, 249, 0.36) 0%, rgba(186, 230, 253, 0.28) 55%, transparent 78%)',
          }}
        />
      </div>

      {/* 2. Subtle Specular Cursor Wash (Desktop Only) */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="absolute w-[520px] h-[520px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle at center, rgba(37, 99, 235, 0.13) 0%, rgba(30, 41, 59, 0.08) 50%, transparent 76%)'
              : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.85) 0%, rgba(125, 211, 252, 0.32) 50%, transparent 76%)',
            willChange: 'transform',
          }}
        />
      )}

      {/* 3. Subtle Floating Dark-Toned Gradient Mesh (Desktop) */}
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
          className="absolute top-[30%] left-[38%] w-[440px] h-[440px] rounded-full blur-[130px] pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(30, 64, 175, 0.10) 0%, rgba(15, 23, 42, 0.12) 50%, transparent 74%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(186, 230, 253, 0.35) 50%, transparent 74%)',
          }}
        />
      )}
    </div>
  );
};

export default CyberBackground;
