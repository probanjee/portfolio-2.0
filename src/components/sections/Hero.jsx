import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github } from 'lucide-react';
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
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, personalInfo.titles]);

  // Portrait Carousel Logic
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

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section id="dashboard" className="min-h-[72vh] flex items-center relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
        
        {/* Left Side: Typography & CTA Actions (Spans 7 Cols) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
          
          {/* DYNAMIC HEADER */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-3xl sm:text-5xl xl:text-[52px] font-extrabold tracking-tight leading-[1.12] text-[#17202B] dark:text-[#F4F6F8]"
            >
              <span className="whitespace-nowrap">Hi, I&apos;m</span>{' '}
              <span className="text-[#087F79] dark:text-[#55D6C8] font-black sm:whitespace-nowrap">{personalInfo.name}</span>
            </motion.h1>

            {/* ACTIVE TERMINAL TYPING BLOCK */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="h-7 font-mono text-sm sm:text-lg text-[#5B6573] dark:text-[#A7B0BC] flex justify-center lg:justify-start items-center space-x-2"
            >
              <span className="text-[#087F79] dark:text-[#55D6C8] font-bold" aria-hidden="true">&gt;_</span>
              <span className="text-[#17202B] dark:text-[#F4F6F8] font-medium">{roleText}</span>
              <span className="w-1.5 h-5 bg-[#087F79] dark:bg-[#55D6C8] animate-pulse rounded-full" aria-hidden="true" />
            </motion.div>
          </div>

          {/* PLATFORM TAGLINE */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-sm sm:text-base text-[#5B6573] dark:text-[#A7B0BC] max-w-xl leading-relaxed mx-auto lg:mx-0 font-sans"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Compact factual portfolio summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="grid grid-cols-3 gap-3 p-4 glass-panel rounded-2xl max-w-md mx-auto lg:mx-0 font-mono text-[11px]"
          >
            <div className="space-y-1">
              <span className="text-[#5B6573] dark:text-[#A7B0BC] block uppercase text-[10px]">Projects</span>
              <span className="text-[#17202B] dark:text-[#F4F6F8] font-bold tabular-nums flex items-center justify-center lg:justify-start">
                05
              </span>
            </div>
            <div className="space-y-1 border-l border-[#17202B]/10 dark:border-white/[0.08] pl-3">
              <span className="text-[#5B6573] dark:text-[#A7B0BC] block uppercase text-[10px]">Primary Focus</span>
              <span className="text-[#087F79] dark:text-[#55D6C8] font-bold">SECURITY</span>
            </div>
            <div className="space-y-1 border-l border-[#17202B]/10 dark:border-white/[0.08] pl-3">
              <span className="text-[#5B6573] dark:text-[#A7B0BC] block uppercase text-[10px]">Core Language</span>
              <span className="text-[#17202B] dark:text-[#F4F6F8] font-bold">C++17</span>
            </div>
          </motion.div>

          {/* ACTION BUTTONS: Primary = View Projects, Secondary = Download CV, Retained GitHub link */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start items-center gap-3 pt-1"
          >
            <Button variant="primary" onClick={scrollToProjects} className="w-full sm:w-auto px-6 py-3">
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
            <Button variant="secondary" href={personalInfo.resumeUrl} download="Prosun_Banerjee_CV.pdf" className="w-full sm:w-auto px-6 py-3">
              <Download className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>Download CV</span>
            </Button>
            <Button variant="outline" href={personalInfo.github} className="w-full sm:w-auto px-5 py-3">
              <Github className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>View Infrastructure</span>
            </Button>
          </motion.div>

          {/* SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="pt-1 flex justify-center lg:justify-start"
          >
            <SocialLinks />
          </motion.div>

        </div>

        {/* Right Side: Calm Circular Portrait Frame (Spans 5 Cols) */}
        <div className="lg:col-span-5 relative flex justify-center items-center py-4 lg:sticky lg:top-24">
          <div className="relative w-64 h-64 sm:w-76 sm:h-76 sm:w-[304px] sm:h-[304px] flex items-center justify-center select-none">
            {/* Subtle single architectural accent ring */}
            <div className="absolute inset-0 rounded-full border border-[#087F79]/20 dark:border-[#55D6C8]/20" aria-hidden="true" />

            {/* Calm Frosted Portrait Frame */}
            <div className="relative w-[88%] h-[88%] rounded-full p-2 bg-[#E8EDF1] dark:bg-[#1D242E] border border-[#17202B]/12 dark:border-white/12 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 14, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -14, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
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
                  className="w-full h-full rounded-full overflow-hidden bg-[#E8EDF1] dark:bg-[#232B38]"
                >
                  <img 
                    src={orbSlides[currentSlide].src} 
                    alt={orbSlides[currentSlide].alt} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                    className={`w-full h-full rounded-full transition-all duration-500 select-none pointer-events-none dark:brightness-110 dark:contrast-[1.04] ${
                      orbSlides[currentSlide].type === 'avatar' ? 'object-contain font-mono text-[0px]' : 'object-cover font-mono text-[0px]'
                    } object-center`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Calm Pagination Indicators */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20 px-2.5 py-1 rounded-full liquid-glass-well">
                {orbSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Show slide ${idx + 1}`}
                    aria-pressed={currentSlide === idx}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] ${
                      currentSlide === idx 
                        ? 'bg-[#087F79] dark:bg-[#55D6C8] w-4' 
                        : 'bg-[#5B6573]/40 dark:bg-[#A7B0BC]/40 w-1.5 hover:bg-[#5B6573]/70 dark:hover:bg-[#A7B0BC]/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
