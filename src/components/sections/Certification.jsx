import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Cloud, Code2, ExternalLink, Eye, Maximize2, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';
import CertificateLightbox from '../ui/CertificateLightbox';

const CERT_TABS = [
  { id: 'All', label: 'All', Icon: Award },
  { id: 'AI & Cloud', label: 'AI & Cloud', Icon: Cloud },
  { id: 'Cybersecurity & IP', label: 'Cybersecurity & IP', Icon: ShieldCheck },
  { id: 'Programming & Data', label: 'Programming & Data', Icon: Code2 },
];

export const Certification = () => {
  const { certifications } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewGroup, setPreviewGroup] = useState(null);

  const visibleCertifications = useMemo(() => {
    if (activeCategory === 'All') return certifications;
    return certifications.filter((cert) => cert.category === activeCategory);
  }, [activeCategory, certifications]);

  const openCertPreview = (cert) => {
    if (!cert.imageUrl) return;
    setPreviewGroup({
      title: cert.title,
      issuer: cert.issuer,
      items: [
        {
          label: cert.title,
          imageUrl: cert.imageUrl,
          date: cert.date,
          credentialId: cert.credentialId,
        },
      ],
    });
  };

  return (
    <section id="certification" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-zinc-900 dark:text-zinc-300 uppercase tracking-[0.2em] font-semibold"
          >
            VERIFIED CREDENTIALS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white"
          >
            Certification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-sm text-zinc-900 dark:text-zinc-200 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Verified certificates and completion badges across cloud architecture, generative AI, cybersecurity, and core programming.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 relative z-10 pointer-events-auto"
          role="tablist"
          aria-label="Filter certifications by domain"
        >
          {CERT_TABS.map(({ id, label, Icon }) => {
            const isSelected = activeCategory === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'liquid-btn-primary liquid-rim'
                    : 'liquid-glass-well liquid-rim text-zinc-900 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 relative z-10" aria-hidden="true" />
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Count Pill */}
        <div className="flex items-center justify-center">
          <span className="text-xs font-mono px-3.5 py-1 rounded-full liquid-glass-well liquid-rim text-zinc-900 dark:text-zinc-200 font-medium">
            {visibleCertifications.length} {activeCategory === 'All' ? 'verified certificates' : `in ${activeCategory}`}
          </span>
        </div>

        {/* Certifications Image Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pointer-events-auto"
        >
          {visibleCertifications.map((cert, idx) => (
            <Card
              key={`${cert.title}-${idx}`}
              className="p-4 sm:p-5 h-full flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                {cert.imageUrl && (
                  <button
                    type="button"
                    onClick={() => openCertPreview(cert)}
                    aria-label={`View full certificate: ${cert.title}`}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/95 dark:bg-black/75 border border-white/80 dark:border-white/25 shadow-inner group/img cursor-zoom-in block focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.title} certificate issued by ${cert.issuer}`}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover/img:scale-[1.03]"
                    />
                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/85 text-white backdrop-blur-md border border-white/35 opacity-0 group-hover/img:opacity-100 group-focus-visible/img:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" />
                      <span>Preview</span>
                    </span>
                  </button>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider truncate">
                      {cert.issuer}
                    </span>
                    {cert.date && (
                      <span className="px-2 py-0.5 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white shrink-0 font-semibold">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-zinc-950 dark:text-white group-hover:opacity-85 transition-opacity leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-zinc-900 dark:text-zinc-200 leading-relaxed font-sans pt-1">
                    {cert.details}
                  </p>
                </div>
              </div>

              {(cert.imageUrl || cert.credentialId || cert.credentialUrl) && (
                <div className="pt-3 border-t border-zinc-950/20 dark:border-white/20 flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="text-zinc-900 dark:text-zinc-300 truncate font-medium">
                    {cert.credentialId ? `ID: ${cert.credentialId}` : 'Verified'}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {cert.imageUrl && (
                      <button
                        type="button"
                        onClick={() => openCertPreview(cert)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white font-bold hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </button>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-950 dark:text-white font-bold hover:underline"
                      >
                        <span>Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </motion.div>

      </div>

      <CertificateLightbox group={previewGroup} onClose={() => setPreviewGroup(null)} />
    </section>
  );
};

export default Certification;
