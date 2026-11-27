import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Reusable full-resolution Liquid Glass modal for previewing single or multi-page certificates.
 * @param {{ group: { title: string, issuer?: string, items: Array<{ label: string, imageUrl: string, date?: string, credentialId?: string }> } | null, onClose: () => void }} props
 */
export const CertificateLightbox = ({ group, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [group]);

  useEffect(() => {
    if (!group) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (group.items.length > 1 && event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % group.items.length);
      } else if (group.items.length > 1 && event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + group.items.length) % group.items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [group, onClose]);

  const currentItem = group?.items?.[activeIndex] || group?.items?.[0] || null;
  const hasMultiple = Boolean(group && group.items.length > 1);

  return (
    <AnimatePresence>
      {group && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          data-lenis-prevent="true"
          role="dialog"
          aria-modal="true"
          aria-label={group.title}
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
            <div className="px-5 py-3.5 border-b border-zinc-950/20 dark:border-white/20 flex items-center justify-between gap-4 shrink-0">
              <div className="min-w-0">
                <p className="text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wider truncate">
                  {[
                    group.issuer,
                    currentItem.date,
                    currentItem.credentialId ? `ID: ${currentItem.credentialId}` : '',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-white truncate">
                  {hasMultiple ? `${group.title} — ${currentItem.label}` : group.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {hasMultiple && (
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white tabular-nums">
                    {activeIndex + 1} / {group.items.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate preview"
                  className="p-2 rounded-full liquid-glass-well liquid-rim text-zinc-950 dark:text-white hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative p-4 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-white/90 dark:bg-slate-950/60">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.label || group.title}
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-lg"
              />

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + group.items.length) % group.items.length)
                    }
                    aria-label="Previous certificate"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full liquid-glass-strong liquid-rim text-slate-800 dark:text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % group.items.length)}
                    aria-label="Next certificate"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full liquid-glass-strong liquid-rim text-slate-800 dark:text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip for Multi-Document Experiences */}
            {hasMultiple && (
              <div className="px-4 py-3 border-t border-slate-900/15 dark:border-white/15 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
                {group.items.map((item, idx) => (
                  <button
                    key={item.imageUrl}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-semibold transition-all cursor-pointer shrink-0 ${
                      idx === activeIndex
                        ? 'liquid-btn-primary liquid-rim text-white'
                        : 'liquid-glass-well liquid-rim text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      aria-hidden="true"
                      className="w-6 h-6 rounded object-cover bg-white"
                    />
                    <span className="max-w-[170px] truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateLightbox;
