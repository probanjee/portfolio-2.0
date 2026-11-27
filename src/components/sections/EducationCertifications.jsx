import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

export const EducationCertifications = () => {
  const { education } = portfolioData;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-10 relative z-10 pointer-events-auto">

        {/* Section Header */}
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
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Education Background
          </motion.h3>
        </div>

        {/* Full-Width Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:to-blue-500/10"
        >
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative pl-12 sm:pl-16 group"
            >
              {/* Timeline Node */}
              <div className="absolute left-[10px] sm:left-[18px] top-6 w-3 h-3 rounded-full bg-white dark:bg-[#080E1E] border-2 border-blue-500/50 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-blue-500 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400" />
              </div>

              <Card className="p-6 sm:p-7 space-y-4 group-hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center">
                      <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full liquid-glass-well text-blue-600 dark:text-sky-400 font-bold tracking-wider">
                      {edu.grade}
                    </span>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full liquid-glass-well text-slate-700 dark:text-slate-300 font-bold tracking-wider">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08]">
                  {edu.details}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default EducationCertifications;
