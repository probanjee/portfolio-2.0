import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Shield, Terminal, Cpu, Award } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

const RotatingFocusLabel = () => {
  const [index, setIndex] = React.useState(0);
  const texts = ["Software Development", "Backend Development"];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-3 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold text-left whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const About = () => {
  const { about } = portfolioData;

  const highlights = [
    {
      title: "Full-Stack Engineering",
      icon: <Layout className="w-5 h-5 text-brand-primary" />,
      description: "Building responsive web interfaces, API-driven applications, and modern software systems with a focus on clean structure and usability.",
      status: "SECURE"
    },
    {
      title: "Cybersecurity Systems",
      icon: <Shield className="w-5 h-5 text-brand-secondary" />,
      description: "Exploring cybersecurity fundamentals through projects like honeypot systems, threat logging, encryption tools, and security-focused architecture.",
      status: "ONLINE"
    },
    {
      title: "C/C++ Problem Solving",
      icon: <Terminal className="w-5 h-5 text-brand-accent" />,
      description: "Practicing algorithmic thinking, object-oriented programming, STL concepts, and memory-conscious development using C and C++.",
      status: "ACTIVE"
    },
    {
      title: "API & Backend Architecture",
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      description: "Learning backend design through API systems, automation workflows, data handling, and scalable service-oriented project structures.",
      status: "READY"
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      
      {/* Cinematic grid spacer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Editorial Summary Block (Spans 5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-3">
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-brand-primary uppercase tracking-widest"
            >
              &gt;_ ARCHITECTURAL PROFILE
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
            >
              {about.title}
            </motion.h3>
            <p className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider italic pt-1">
              {about.subtitle}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans font-medium">
              {about.description}
            </p>
          </motion.div>

          {/* Inline Editorial System Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.03]">
            {about.metrics.map((metric, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 + 0.3 }}
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/40 border border-white/[0.02] flex flex-col justify-center space-y-1.5 hover:border-brand-primary/10 transition-colors duration-300"
              >
                <span className="text-xl sm:text-2xl font-black font-mono text-gradient">{metric.value}</span>
                {metric.label === "C/C++ Core Focus" ? (
                  <RotatingFocusLabel />
                ) : (
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold">{metric.label}</span>
                )}
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Column: 4 Premium Domain Highlight Cards (Spans 7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {highlights.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={card.title}
              className="h-full"
            >
              <Card className="h-full flex flex-col justify-between p-6 space-y-6 group hover:shadow-[0_12px_40px_rgba(59,130,246,0.06)] border border-white/[0.03] hover:border-brand-primary/15 transition-all">
                
                <div className="space-y-4">
                  
                  {/* Card Icon Frame */}
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/[0.04] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    {card.icon}
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm sm:text-base font-extrabold group-hover:text-brand-primary transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                </div>

                {/* Secure telemetry dial */}
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.03] font-mono text-[9px] text-slate-500 font-bold">
                  <span>SECURE CHANNEL STATUS:</span>
                  <span className="text-brand-primary flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse mr-1" />
                    {card.status}
                  </span>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
