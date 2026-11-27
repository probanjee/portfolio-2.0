import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Code2, Database, Dumbbell, LockKeyhole, ShieldCheck, Workflow } from 'lucide-react';
import Button from '../ui/Button';

const projectIcons = {
  'sqlsense': Database,
  'honeypot-system': ShieldCheck,
  'file-encryption-tool': LockKeyhole,
  'workout-planning-app': Dumbbell,
  'api-automation-generator': Workflow,
};

export const ProjectCard = ({ project, isFeatured }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ProjectIcon = projectIcons[project.id] || Code2;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute 3D tilt coordinates based on relative mouse positions
  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates from card origin center point
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 8 degrees tilt angle for dynamic luxury response without causing nausea
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: !isMobile ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : 'none',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      className={`relative rounded-[24px] transition-transform duration-300 ease-out h-full group ${
        isFeatured ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Core Liquid Glass Card Panel */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="relative glass-panel liquid-rim card-hover-effect rounded-[24px] p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden z-10"
      >
        {/* Content Body */}
        <div className="space-y-6">
          
          {/* Card Header row */}
          <div className="flex items-center justify-between gap-2">
            <div className="w-12 h-12 rounded-2xl liquid-glass-well flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <ProjectIcon aria-hidden="true" className="w-6 h-6 text-blue-600 dark:text-sky-400" />
            </div>
            
            <div className="flex items-center flex-wrap justify-end gap-2">
              {isFeatured && (
                <span className="text-[9px] font-mono font-bold tracking-wider bg-blue-500/10 dark:bg-sky-400/15 border border-blue-500/20 dark:border-sky-400/25 text-blue-700 dark:text-sky-300 px-2.5 py-1 rounded-full uppercase">
                  FEATURED PIPELINE
                </span>
              )}
              <span className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full liquid-glass-well text-slate-600 dark:text-slate-300">
                {project.category}
              </span>
            </div>
          </div>

          {/* Texts info */}
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-200">
              {project.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {isFeatured ? project.longDescription : project.shortDescription}
            </p>
          </div>

          {/* Micro Telemetry variables row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl liquid-glass-well font-mono text-[10px]">
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="space-y-0.5 min-w-0">
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[8px]">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold block truncate">{val}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Footer row */}
        <div className="space-y-5 pt-6 border-t border-slate-900/[0.08] dark:border-white/[0.08] mt-6">
          
          {/* Tech pills row */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/[0.08] dark:bg-sky-400/10 border border-blue-600/15 dark:border-sky-400/20 text-blue-700 dark:text-sky-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Dynamic Buttons triggers */}
          <div className="flex justify-between items-center text-xs font-mono">
            <Button variant="text" href={project.codeLink} className="p-0 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white flex items-center space-x-1 font-bold group/btn text-[10px] uppercase tracking-wider">
              <span>SOURCE_REPOS</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
            
            {(() => {
              const routeMap = {
                'sqlsense': 'sqlsense',
                'honeypot-system': 'honeypot-system',
                'file-encryption-tool': 'file-encryption-tool',
                'workout-planning-app': 'heuristic-workout-app',
                'api-automation-generator': 'dynamic-api-generator'
              };
              const pathId = routeMap[project.id] || project.id;
              return (
                <Link 
                  to={`/projects/${pathId}`} 
                  className="text-[10px] font-mono text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300 font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors group/case"
                >
                  <span>VIEW CASE STUDY</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/case:translate-x-1 transition-transform" />
                </Link>
              );
            })()}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
