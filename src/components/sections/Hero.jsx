import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';

export const Hero = () => {
  const { personalInfo } = portfolioData;
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // High-fidelity Typewriter Logic
  useEffect(() => {
    const roles = personalInfo.titles;
    const currentRole = roles[roleIndex];
    
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText(currentRole.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setRoleText(currentRole.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // Hold role text for 2.5s
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, personalInfo.titles]);

  // Premium Orb Carousel Logic
  const orbSlides = [
    { type: "avatar", src: "/assets/avatar.png", alt: "Prosun Banerjee 3D Avatar" },
    { type: "photo", src: "/assets/pic-2.png", alt: "Prosun Banerjee Photo" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % orbSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging, orbSlides.length]);

  return (
    <section id="dashboard" className="min-h-[85vh] flex items-center relative py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Side: Rich Typography & CTA Actions (Spans 7 Cols) */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          {/* DYNAMIC HEADER */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-950 dark:text-white"
            >
              Hi, I&apos;m <span className="text-gradient font-black">{personalInfo.name}</span>
            </motion.h1>

            {/* HIGH-FIDELITY ACTIVE TERMINAL TYPING BLOCK */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8 font-mono text-sm sm:text-lg text-zinc-900 dark:text-zinc-100 flex justify-center lg:justify-start items-center space-x-2"
            >
              <span className="text-zinc-950 dark:text-white font-bold">&gt;_</span>
              <span>{roleText}</span>
              <span className="w-1.5 h-5 bg-zinc-950 dark:bg-white animate-pulse rounded-full" />
            </motion.div>
          </div>

          {/* PLATFORM TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-zinc-900 dark:text-zinc-200 max-w-xl leading-relaxed mx-auto lg:mx-0 font-sans font-medium"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Factual portfolio summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 p-4 glass-panel liquid-rim rounded-[22px] max-w-md mx-auto lg:mx-0 font-mono text-[10px] text-zinc-900 dark:text-zinc-200"
          >
            <div className="space-y-1">
              <span className="text-zinc-900 dark:text-zinc-300 block uppercase font-semibold">Projects</span>
              <span className="text-zinc-950 dark:text-white font-bold tabular-nums flex items-center justify-center lg:justify-start">
                05
              </span>
            </div>
            <div className="space-y-1 border-l border-zinc-950/20 dark:border-white/20 pl-3">
              <span className="text-zinc-900 dark:text-zinc-300 block uppercase font-semibold">Primary Focus</span>
              <span className="text-zinc-950 dark:text-white font-bold">SECURITY</span>
            </div>
            <div className="space-y-1 border-l border-zinc-950/20 dark:border-white/20 pl-3">
              <span className="text-zinc-900 dark:text-zinc-300 block uppercase font-semibold">Core Language</span>
              <span className="text-zinc-950 dark:text-white font-bold">C++17</span>
            </div>
          </motion.div>

          {/* DUAL ACTION CALL TO BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
          >
            <Button variant="primary" href={personalInfo.resumeUrl} download="Prosun_Banerjee_CV.pdf" className="w-full sm:w-auto px-6 py-3.5">
              <Download className="w-4 h-4 mr-2" />
              DOWNLOAD CV (PDF)
            </Button>
            <Button variant="secondary" href={personalInfo.github} className="w-full sm:w-auto px-6 py-3.5 group">
              <Github className="w-4 h-4 mr-2 text-zinc-950 dark:text-white group-hover:opacity-80 transition-opacity" />
              VIEW INFRASTRUCTURE
            </Button>
          </motion.div>

          {/* SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="pt-1 flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </motion.div>

        </div>

        {/* Right Side: Ultra-Premium Sticky Avatar Orbit Deck (Spans 5 Cols) */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-8 lg:sticky lg:top-28">
          
          {/* Framer Motion Floating wrapper mimicking a magnetic field */}
          <motion.div
            animate={{
              y: [-10, 10, -10]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center select-none"
          >
            {/* Ambient Monochrome Halo Behind Avatar */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-white/25 via-zinc-300/15 to-white/10 dark:from-white/15 dark:via-zinc-400/10 dark:to-white/5 blur-3xl animate-pulse" />

            {/* Rotating Orbit Ring 1 (Dashed Outer Ring) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-950/30 dark:border-white/30 animate-[spin_40s_linear_infinite]" />

            {/* Rotating Orbit Ring 2 (Double Border Inner Ring, rotating reverse) */}
            <div className="absolute inset-4 rounded-full border-2 border-double border-zinc-950/20 dark:border-white/20 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Orbit Node Indicators */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-300 shadow-[0_0_10px_rgba(255,255,255,0.65)]" />
            <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />

            {/* Liquid Glass Avatar Frame with Swipeable Carousel */}
            <div className="relative w-[82%] h-[82%] rounded-full p-2.5 liquid-glass-strong liquid-rim flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, { offset }) => {
                    setIsDragging(false);
                    const swipe = offset.x;
                    if (swipe < -50) {
                      setCurrentSlide((prev) => (prev + 1) % orbSlides.length);
                    } else if (swipe > 50) {
                      setCurrentSlide((prev) => (prev - 1 + orbSlides.length) % orbSlides.length);
                    }
                  }}
                  className="w-full h-full"
                >
                  <img 
                    src={orbSlides[currentSlide].src} 
                    alt={orbSlides[currentSlide].alt} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                    className={`w-full h-full rounded-full transition-all duration-500 select-none pointer-events-none ${
                      orbSlides[currentSlide].type === 'avatar' ? 'object-contain font-mono text-[0px]' : 'object-cover font-mono text-[0px]'
                    } object-center`}
                  />
                  {orbSlides[currentSlide].type === 'photo' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none rounded-full" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mini Pagination Indicators inside Orb */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20 px-2 py-1 rounded-full liquid-glass-well liquid-rim">
                {orbSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Show slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx 
                        ? 'bg-zinc-950 dark:bg-white w-4' 
                        : 'bg-zinc-950/35 dark:bg-white/35 w-1.5 hover:bg-zinc-950/60 dark:hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
