import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, ShieldAlert, Cpu } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

export const EducationCertifications = () => {
  const { education, certifications } = portfolioData;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start relative z-10 pointer-events-auto">
        
        {/* Left Column: Academic Timeline (Education) */}
        <div className="space-y-8">
          
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-brand-primary uppercase tracking-widest"
            >
              &gt;_ ACADEMIC LEDGER
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              Education Background
            </motion.h3>
          </div>

          {/* Education Timeline */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-brand-primary before:to-brand-primary/10"
          >
            {education.map((edu, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative pl-12 sm:pl-16 group"
              >
                
                {/* Glowing Node */}
                <div className="absolute left-[10px] sm:left-[18px] top-5 w-3 h-3 rounded-full bg-[#02050D] border-2 border-brand-primary/40 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-brand-primary transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                </div>

                <Card className="p-5 sm:p-6 space-y-4 border border-white/[0.03] hover:border-brand-primary/15 hover:bg-slate-950/40 backdrop-blur-md shadow-md group-hover:translate-x-1.5 transition-all duration-300">
                  
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-brand-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center">
                        <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-white/[0.04] text-slate-400 self-start sm:self-auto font-black tracking-widest">
                      {edu.period}
                    </span>
                  </div>

                  {/* Grades */}
                  <div className="flex items-center space-x-2 text-[10px] font-mono font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">GRADE ATTAINMENT:</span>
                    <span className="text-brand-primary tracking-wider">{edu.grade}</span>
                  </div>

                  {/* Core details */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-3 border-t border-white/[0.03]">
                    {edu.details}
                  </p>

                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Verifications & Badges (Certifications) */}
        <div className="space-y-8">
          
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-brand-secondary uppercase tracking-widest"
            >
              &gt;_ DECRYPTED CRITERIA
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              Certifications & Training
            </motion.h3>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 sm:space-y-5"
          >
            {certifications.map((cert, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-5 sm:p-6 space-y-4 border border-white/[0.03] hover:border-brand-secondary/15 hover:bg-slate-950/40 backdrop-blur-md shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-brand-secondary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:border-brand-secondary/25 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-all">
                      <Award className="w-4 h-4 text-brand-secondary animate-pulse" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-3 border-t border-white/[0.03]">
                    {cert.details}
                  </p>

                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default EducationCertifications;
