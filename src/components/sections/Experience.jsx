import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Terminal } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';
import CertificateLightbox from '../ui/CertificateLightbox';

export const Experience = () => {
  const { experience } = portfolioData;
  const [previewGroup, setPreviewGroup] = useState(null);

  const openJobCertificates = (job) => {
    if (!job.certificates?.length) return;
    setPreviewGroup({
      title: `${job.role} — ${job.company}`,
      issuer: job.company,
      items: job.certificates,
    });
  };

  return (
    <section id="experience" className="scroll-mt-24 py-12 sm:py-16 relative overflow-hidden">
      <div className="space-y-8">

        {/* SECTION HEADER */}
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#087F79] dark:text-[#55D6C8] uppercase tracking-widest font-semibold"
          >
            &gt;_ Industry Engagements
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17202B] dark:text-[#F4F6F8]"
          >
            Professional Experience
          </motion.h3>
        </div>

        {/* COMPACT TIMELINE */}
        <div className="space-y-6 relative before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-px before:bg-[#17202B]/15 dark:before:bg-white/12 pointer-events-auto">
          {experience.map((job, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              key={`${job.company}-${job.period}`}
              className="relative pl-10 sm:pl-14 group"
            >
              {/* Timeline Node */}
              <div
                aria-hidden="true"
                className="absolute left-[9px] sm:left-[15px] top-6 w-2.5 h-2.5 rounded-full bg-[#F3F5F7] dark:bg-[#0B0D10] border-2 border-[#087F79] dark:border-[#55D6C8] z-10"
              />

              {/* COMPACT CARD */}
              <Card className="p-5 sm:p-6 space-y-4">
                {/* Scannable Role, Organization & Dates Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2.5 pb-3.5 border-b border-[#17202B]/10 dark:border-white/[0.08]">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-[#087F79] dark:text-[#55D6C8] shrink-0" aria-hidden="true" />
                      <h4 className="text-base sm:text-lg font-bold text-[#17202B] dark:text-[#F4F6F8]">
                        {job.role}
                      </h4>
                    </div>
                    <p className="text-xs font-mono font-semibold text-[#087F79] dark:text-[#55D6C8]">
                      {job.company} <span className="text-[#5B6573] dark:text-[#A7B0BC] font-normal">&bull; {job.location}</span>
                    </p>
                  </div>

                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#E8EDF1] dark:bg-[#1D242E] text-[#17202B] dark:text-[#F4F6F8] self-start sm:self-auto font-semibold shrink-0">
                    {job.period}
                  </span>
                </div>

                {/* Concise Role Summary */}
                <p className="text-xs sm:text-sm text-[#5B6573] dark:text-[#A7B0BC] leading-relaxed font-sans">
                  {job.description}
                </p>

                {/* Scannable Deliverables + Preview Action */}
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#17202B] dark:text-[#F4F6F8] font-semibold">
                      Key Deliverables
                    </span>

                    {job.certificates?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => openJobCertificates(job)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-btn-primary text-[11px] font-mono font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] dark:focus-visible:ring-offset-[#151A22]"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>
                          {job.certificates.length > 1
                            ? `Preview Certificates (${job.certificates.length})`
                            : 'Preview Certificate'}
                        </span>
                      </button>
                    )}
                  </div>

                  <ul className="space-y-1.5">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-[#17202B] dark:text-[#F4F6F8] flex items-start space-x-2.5 leading-relaxed">
                        <span className="text-[#087F79] dark:text-[#55D6C8] font-bold mt-0.5" aria-hidden="true">&bull;</span>
                        <span className="font-sans text-[#5B6573] dark:text-[#A7B0BC]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      <CertificateLightbox group={previewGroup} onClose={() => setPreviewGroup(null)} />
    </section>
  );
};

export default Experience;
