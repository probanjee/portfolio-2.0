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
    <section id="education" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start relative z-10 pointer-events-auto">
        
        {/* Left Column: Academic Timeline (Education) */}
        <div className="space-y-8">
          
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-widest"
            >
              &gt;_ ACADEMIC LEDGER
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
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
            className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:to-blue-500/10"
          >
            {education.map((edu, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative pl-12 sm:pl-16 group"
              >
                
                {/* Timeline Node */}
                <div className="absolute left-[10px] sm:left-[18px] top-5 w-3 h-3 rounded-full bg-white dark:bg-[#080E1E] border-2 border-blue-500/50 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-blue-500 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400" />
                </div>

                <Card className="p-5 sm:p-6 space-y-4 group-hover:translate-x-1">
                  
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center">
                        <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full liquid-glass-well text-slate-700 dark:text-slate-300 self-start sm:self-auto font-bold tracking-wider">
                      {edu.period}
                    </span>
                  </div>

                  {/* Grades */}
                  <div className="flex items-center space-x-2 text-[10px] font-mono font-bold">
                    <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest">GRADE ATTAINMENT:</span>
                    <span className="text-blue-600 dark:text-sky-400 tracking-wider">{edu.grade}</span>
                  </div>

                  {/* Core details */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
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
              className="text-xs font-mono text-indigo-600 dark:text-indigo-300 uppercase tracking-widest"
            >
              &gt;_ DECRYPTED CRITERIA
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
            >
              Certifications &amp; Training
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
                <Card className="p-5 sm:p-6 space-y-4 group">
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl liquid-glass-well flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
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
