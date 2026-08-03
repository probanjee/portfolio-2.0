import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

export const Experience = () => {
  const { experience } = portfolioData;

  // Animation Variant Sets for Synchronized Hover Scales
  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const nodeVariants = {
    initial: { scale: 1, boxShadow: '0 0 0px rgba(59, 130, 246, 0)' },
    hover: { 
      scale: 1.25, 
      borderColor: 'rgba(59, 130, 246, 0.8)',
      boxShadow: '0 0 18px rgba(59, 130, 246, 0.7)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.015,
      y: -2,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      <div className="space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-brand-primary uppercase tracking-widest"
          >
            &gt;_ INDUSTRY ENGAGEMENTS
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Professional Experience
          </motion.h3>
        </div>

        {/* TIMELINE TRACK WRAPPER */}
        <div className="space-y-10 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-brand-primary before:via-brand-secondary before:to-brand-accent/30 pointer-events-auto">
          {experience.map((job, idx) => (
            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15 }}
              key={job.company}
              className="relative pl-12 sm:pl-16 group cursor-pointer"
            >
              
              {/* SYNCHRONIZED TIMELINE NODE (Glows brighter & scales on card hover!) */}
              <motion.div 
                variants={nodeVariants}
                className="absolute left-[10px] sm:left-[18px] top-6 w-3 h-3 rounded-full bg-[#02050D] border-2 border-brand-primary/40 flex items-center justify-center z-10"
              >
                {/* Core flashing node pulse */}
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              </motion.div>

              {/* CARD BLOCK */}
              <motion.div variants={cardVariants}>
                <Card className="p-6 sm:p-8 space-y-6 border border-white/[0.03] group-hover:border-brand-primary/15 hover:bg-slate-950/40 backdrop-blur-md shadow-lg transition-all duration-300">
                  
                  {/* Card Header Info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-4 border-b border-white/[0.03]">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2.5">
                        <Terminal className="w-4 h-4 text-brand-primary animate-pulse" />
                        <h4 className="text-lg sm:text-xl font-extrabold text-slate-100">{job.role}</h4>
                      </div>
                      <p className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">
                        {job.company} <span className="text-slate-600 font-normal">|</span> {job.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-3 py-1.5 rounded-full bg-slate-950 border border-white/[0.04] text-slate-400 self-start sm:self-auto font-bold tracking-wider">
                      {job.period}
                    </span>
                  </div>

                  {/* High-level Job Summary Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {job.description}
                  </p>
                  
                  {/* Internship Key Deliverables list */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-slate-400 flex items-start space-x-2.5 bg-slate-950/20 p-2.5 rounded-xl border border-white/[0.01]">
                          <span className="text-brand-primary font-mono text-[10px] mt-0.5">▸</span>
                          <span className="font-sans leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </Card>
              </motion.div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
