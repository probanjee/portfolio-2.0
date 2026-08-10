import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Github, ShieldAlert, Cpu, Terminal, Shield, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Button from '../ui/Button';

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
          
          {/* SECURE SUITE BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[10px] sm:text-xs font-semibold uppercase tracking-widest font-mono mx-auto lg:mx-0 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
          >
            <Shield className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span>AI SECURITY NODE ACTIVE // v2.0</span>
          </motion.div>

          {/* DYNAMIC HEADER */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              Hi, I'm <span className="text-gradient font-black">{personalInfo.name}</span>
            </motion.h1>

            {/* HIGH-FIDELITY ACTIVE TERMINAL TYPING BLOCK */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-8 font-mono text-sm sm:text-lg text-slate-300 flex justify-center lg:justify-start items-center space-x-2"
            >
              <span className="text-brand-primary font-bold">&gt;_</span>
              <span className="text-slate-300">{roleText}</span>
              <span className="w-1.5 h-4.5 bg-brand-primary animate-pulse" />
            </motion.div>
          </div>

          {/* PLATFORM TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0 font-sans"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* SIMULATED SYSTEM STATS BOARD (For authentic Cybersecurity SaaS feel) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 p-4 bg-slate-950/40 border border-white/[0.03] backdrop-blur-md rounded-2xl max-w-md mx-auto lg:mx-0 font-mono text-[10px] text-slate-400"
          >
            <div className="space-y-1">
              <span className="text-slate-600 block uppercase">Threat Level</span>
              <span className="text-emerald-400 font-bold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                SECURE
              </span>
            </div>
            <div className="space-y-1 border-l border-white/5 pl-3">
              <span className="text-slate-600 block uppercase">Core Engine</span>
              <span className="text-brand-primary font-bold">ASYNCHRONOUS</span>
            </div>
            <div className="space-y-1 border-l border-white/5 pl-3">
              <span className="text-slate-600 block uppercase">Encryption</span>
              <span className="text-brand-secondary font-bold">AES-256</span>
            </div>
          </motion.div>

          {/* DUAL ACTION CALL TO BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
          >
            <Button variant="primary" href={personalInfo.resumeUrl} download="Prosun_Banerjee_CV.pdf" className="w-full sm:w-auto px-6 py-3.5 shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]">
              <Download className="w-4 h-4 mr-2" />
              DOWNLOAD CV (PDF)
            </Button>
            <Button variant="secondary" href={personalInfo.github} className="w-full sm:w-auto px-6 py-3.5 group border-white/5 hover:border-brand-primary/20 bg-white/5">
              <Github className="w-4 h-4 mr-2 text-slate-400 group-hover:text-white transition-colors" />
              VIEW INFRASTRUCTURE
            </Button>
          </motion.div>

        </div>

        {/* Right Side: Ultra-Premium Sticky Avatar Orbit Deck (Spans 5 Cols) */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-8 lg:sticky lg:top-28">
          
          {/* Framer Motion Floating wrapper mimicking a magnetic field */}
          <motion.div
            animate={{
              y: [-12, 12, -12]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center select-none"
          >
            {/* Ambient Glowing Halo Behind Avatar */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-primary/30 via-brand-secondary/20 to-brand-accent/20 blur-3xl animate-pulse" />

            {/* Rotating Orbit Ring 1 (Dashed Cyber-Blue Outer Ring) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-brand-primary/25 animate-[spin_40s_linear_infinite]" />

            {/* Rotating Orbit Ring 2 (Double Border Purple Inner Ring, rotating reverse) */}
            <div className="absolute inset-4 rounded-full border-2 border-double border-brand-secondary/20 animate-[spin_25s_linear_infinite_reverse]" />

            {/* Cyber Node Core Indicators (Simulating interactive scanner crosshairs) */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-secondary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

            {/* Frosted Avatar Card Core Frame with Swipeable Carousel */}
            <div className="relative w-[82%] h-[82%] rounded-full p-2.5 bg-slate-100/80 dark:bg-slate-950/60 backdrop-blur-premium border border-slate-900/10 dark:border-brand-primary/20 shadow-[0_16px_48px_rgba(2,5,13,0.5),inset_0_0_24px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
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
                  onDragEnd={(e, { offset, velocity }) => {
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
                      // Fallback gracefully if image is delayed or fails
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                    className={`w-full h-full rounded-full transition-all duration-500 select-none pointer-events-none ${
                      orbSlides[currentSlide].type === 'avatar' ? 'object-contain font-mono text-[0px]' : 'object-cover font-mono text-[0px]'
                    } object-center`}
                  />
                  {orbSlides[currentSlide].type === 'photo' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mini Pagination Indicators inside Orb */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
                {orbSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      currentSlide === idx 
                        ? 'bg-brand-primary w-4 shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
                        : 'bg-slate-400/30 w-1.5 hover:bg-slate-400/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Glowing Tech Spotlight Tracker overlaying avatar */}
            <div className="absolute inset-10 rounded-full bg-radial-vignette opacity-20 pointer-events-none mix-blend-screen" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
