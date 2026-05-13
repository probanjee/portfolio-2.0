import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import ProjectCard from '../projects/ProjectCard';

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      <div className="space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-brand-primary uppercase tracking-widest"
          >
            &gt;_ CORE REPOSITORIES
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Featured Security & System Pipelines
          </motion.h3>
        </div>

        {/* PROJECTS RESPONSIVE GRID (Featured card occupies full columns on desktop layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pointer-events-auto">
          {projects.map((proj, idx) => {
            const isFeatured = proj.id === 'honeypot-system';
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={proj.id}
                className="h-full"
              >
                <ProjectCard project={proj} isFeatured={isFeatured} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
