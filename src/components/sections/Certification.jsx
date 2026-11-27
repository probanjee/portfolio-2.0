import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Cloud, Code2, ExternalLink, Maximize2, ShieldCheck, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

const CERT_TABS = [
  { id: 'All', label: 'All', Icon: Award },
  { id: 'AI & Cloud', label: 'AI & Cloud', Icon: Cloud },
  { id: 'Cybersecurity & IP', label: 'Cybersecurity & IP', Icon: ShieldCheck },
  { id: 'Programming & Data', label: 'Programming & Data', Icon: Code2 },
];

export const Certification = () => {
  const { certifications } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const visibleCertifications = useMemo(() => {
    if (activeCategory === 'All') return certifications;
    return certifications.filter((cert) => cert.category === activeCategory);
  }, [activeCategory, certifications]);

  useEffect(() => {
    if (!selectedCert) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section id="certification" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-[0.2em] font-semibold"
          >
            VERIFIED CREDENTIALS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Certification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
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
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.35)] dark:shadow-[0_8px_22px_-6px_rgba(255,255,255,0.28)]'
                    : 'liquid-glass-well text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Count Pill */}
        <div className="flex items-center justify-center">
          <span className="text-xs font-mono px-3.5 py-1 rounded-full liquid-glass-well text-slate-600 dark:text-slate-400">
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
                {/* Interactive Certificate Image Thumbnail */}
                {cert.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    aria-label={`View full certificate: ${cert.title}`}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-slate-900/90 border border-slate-900/10 dark:border-white/15 shadow-inner group/img cursor-zoom-in block focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.title} certificate issued by ${cert.issuer}`}
                      loading="lazy"
                      className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover/img:scale-[1.03]"
                    />
                    <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-slate-900/75 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 group-focus-visible/img:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" />
                      <span>Preview</span>
                    </span>
                  </button>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider truncate">
                      {cert.issuer}
                    </span>
                    {cert.date && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 border border-blue-500/20 dark:bg-sky-400/12 dark:text-sky-300 dark:border-sky-400/25 shrink-0 font-semibold">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-1">
                    {cert.details}
                  </p>
                </div>
              </div>

              {(cert.credentialId || cert.credentialUrl) && (
                <div className="pt-3 border-t border-slate-900/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-3 text-[10px] font-mono">
                  {cert.credentialId ? (
                    <span className="text-slate-500 dark:text-slate-400 truncate">
                      ID: {cert.credentialId}
                    </span>
                  ) : (
                    <span />
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-sky-400 font-bold hover:underline shrink-0"
                    >
                      <span>Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </Card>
          ))}
        </motion.div>

      </div>

      {/* Full-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
            data-lenis-prevent="true"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
            className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] rounded-3xl liquid-glass-strong liquid-rim overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-slate-900/10 dark:border-white/10 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider truncate">
                    {selectedCert.issuer}
                    {selectedCert.date ? ` · ${selectedCert.date}` : ''}
                    {selectedCert.credentialId ? ` · ID: ${selectedCert.credentialId}` : ''}
                  </p>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 truncate">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                  className="p-2 rounded-full liquid-glass-well text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-white/85 dark:bg-slate-950/60">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="max-h-[72vh] w-auto object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certification;
