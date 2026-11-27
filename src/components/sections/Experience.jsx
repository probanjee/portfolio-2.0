import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Terminal } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';
import CertificateLightbox from '../ui/CertificateLightbox';

export const Experience = () => {
  const { experience } = portfolioData;
  const [previewGroup, setPreviewGroup] = useState(null);

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const nodeVariants = {
    initial: { scale: 1, boxShadow: '0 0 0px rgba(255, 255, 255, 0)' },
    hover: {
      scale: 1.25,
      borderColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 0 16px rgba(255, 255, 255, 0.55)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.015,
      y: -2,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const openJobCertificates = (job) => {
    if (!job.certificates?.length) return;
    setPreviewGroup({
      title: `${job.role} — ${job.company}`,
      issuer: job.company,
      items: job.certificates,
    });
  };

  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-12">

        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-zinc-900 dark:text-zinc-300 uppercase tracking-widest font-semibold"
          >
            &gt;_ INDUSTRY ENGAGEMENTS
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            Professional Experience
          </motion.h3>
        </div>

        {/* TIMELINE TRACK WRAPPER */}
        <div className="space-y-10 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-zinc-950/60 before:via-zinc-950/25 before:to-transparent dark:before:from-white/65 dark:before:via-white/25 dark:before:to-transparent pointer-events-auto">
          {experience.map((job, idx) => (
            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.15 }}
              key={`${job.company}-${job.period}`}
              className="relative pl-12 sm:pl-16 group"
            >
              {/* SYNCHRONIZED TIMELINE NODE */}
              <motion.div
                variants={nodeVariants}
                className="absolute left-[10px] sm:left-[18px] top-6 w-3 h-3 rounded-full bg-white dark:bg-black border-2 border-zinc-950/50 dark:border-white/60 flex items-center justify-center z-10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white animate-pulse" />
              </motion.div>

              {/* CARD BLOCK */}
              <motion.div variants={cardVariants}>
                <Card className="p-6 sm:p-8 space-y-6">
                  {/* Card Header Info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-4 border-b border-zinc-950/20 dark:border-white/20">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2.5">
                        <Terminal className="w-4 h-4 text-zinc-950 dark:text-white" />
                        <h4 className="text-lg sm:text-xl font-extrabold text-zinc-950 dark:text-white">{job.role}</h4>
                      </div>
                      <p className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-widest">
                        {job.company} <span className="text-zinc-700 dark:text-zinc-400 font-normal">|</span> {job.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-3 py-1.5 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white self-start sm:self-auto font-bold tracking-wider">
                      {job.period}
                    </span>
                  </div>

                  {/* High-level Job Summary Description */}
                  <p className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                    {job.description}
                  </p>

                  {/* Internship Key Deliverables + Preview Certificate Action Row */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-300 font-bold">
                        KEY DELIVERABLES:
                      </span>

                      {job.certificates?.length > 0 && (
                        <button
                          type="button"
                          onClick={() => openJobCertificates(job)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-btn-primary liquid-rim text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer transition-transform hover:scale-[1.03]"
                        >
                          <Eye className="w-3.5 h-3.5 shrink-0 relative z-10" />
                          <span className="relative z-10">
                            {job.certificates.length > 1
                              ? `Preview Certificates (${job.certificates.length})`
                              : 'Preview Certificate'}
                          </span>
                        </button>
                      )}
                    </div>

                    <ul className="grid grid-cols-1 gap-2.5">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs text-zinc-900 dark:text-zinc-100 flex items-start space-x-2.5 liquid-glass-well liquid-rim p-3 rounded-2xl">
                          <span className="text-zinc-950 dark:text-white font-mono text-[10px] mt-0.5">▸</span>
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

      <CertificateLightbox group={previewGroup} onClose={() => setPreviewGroup(null)} />
    </section>
  );
};

export default Experience;
