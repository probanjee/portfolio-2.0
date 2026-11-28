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
            className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] uppercase tracking-widest font-semibold"
          >
            &gt;_ ACADEMIC LEDGER
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17202B] dark:text-[#F4F6F8]"
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
          className="space-y-6 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#087F79]/50 before:to-transparent dark:before:from-[#55D6C8]/40 dark:before:to-transparent"
        >
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative pl-12 sm:pl-16 group"
            >
              {/* Timeline Node */}
              <div className="absolute left-[10px] sm:left-[18px] top-6 w-3 h-3 rounded-full bg-white dark:bg-black border-2 border-[#087F79]/60 dark:border-[#55D6C8]/60 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-[#087F79] dark:bg-[#55D6C8]" />
              </div>

              <Card className="p-6 sm:p-7 space-y-4 group-hover:translate-x-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-extrabold text-[#17202B] dark:text-[#F4F6F8] group-hover:opacity-85 transition-opacity">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-mono font-bold text-[#5B6573] dark:text-[#A7B0BC] uppercase tracking-wider flex items-center">
                      <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#087F79] dark:text-[#55D6C8]" />
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full liquid-glass-well text-[#17202B] dark:text-[#F4F6F8] font-bold tracking-wider">
                      {edu.grade}
                    </span>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full liquid-glass-well text-[#17202B] dark:text-[#F4F6F8] font-bold tracking-wider">
                      {edu.period}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5B6573] dark:text-[#A7B0BC] leading-relaxed font-sans pt-3 border-t border-[#17202B]/10 dark:border-white/[0.09]">
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
