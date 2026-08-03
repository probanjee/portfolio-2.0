import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, FileKey, Activity, CodeXml, ChevronRight, Terminal, ShieldAlert as ShieldIcon, Database } from 'lucide-react';
import Button from '../ui/Button';

// Icon Router mapping strings to matching SVG wrappers
const IconMap = ({ name, className }) => {
  const icons = {
    ShieldAlert: <ShieldAlert className={className} />,
    FileKey: <FileKey className={className} />,
    Activity: <Activity className={className} />,
    CodeXml: <CodeXml className={className} />,
    Database: <Database className={className} />
  };
  return icons[name] || <Terminal className={className} />;
};

export const ProjectCard = ({ project, isFeatured }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      className={`relative rounded-2xl transition-all duration-300 ease-out h-full group select-none ${
        isFeatured ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      {/* 1. Animated Gradient Border Frame (Lights up and transitions on hover) */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-white/[0.03] dark:bg-[#ffffff08] group-hover:bg-gradient-to-tr group-hover:from-brand-primary group-hover:via-brand-secondary group-hover:to-brand-accent transition-all duration-700 pointer-events-none z-0" />

      {/* 2. Soft Dynamic Glow Flare Behind Card (Desktop Only) */}
      {!isMobile && (
        <div 
          className="absolute inset-4 rounded-2xl bg-brand-primary/5 filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-screen" 
          style={{
            background: isFeatured ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)'
          }}
        />
      )}

      {/* 3. Core Frosted Card Panel */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="relative bg-[#02050D]/65 backdrop-blur-premium rounded-[15px] p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(2,5,13,0.3)] z-10"
      >
        
        {/* Dynamic Scanline Glass Overlay on Hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.015] bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px] transition-opacity duration-300" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-brand-primary/0 via-white/0 to-white/[0.02] group-hover:to-white/[0.04] transition-all duration-500" />

        {/* Content Body */}
        <div className="space-y-6">
          
          {/* Card Header row */}
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/[0.04] flex items-center justify-center shadow-inner group-hover:border-brand-primary/25 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-500">
              <IconMap name={project.icon} className="w-5 h-5 text-brand-primary group-hover:scale-105 transition-transform" />
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Featured Label for Honeypot */}
              {isFeatured && (
                <span className="text-[8px] font-mono font-black tracking-widest bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-2.5 py-1 rounded-md uppercase">
                  FEATURED PIPELINE
                </span>
              )}
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.03] text-slate-400">
                {project.category}
              </span>
            </div>
          </div>

          {/* Texts info */}
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-black text-slate-100 group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
              {isFeatured ? project.longDescription : project.shortDescription}
            </p>
          </div>

          {/* Micro Telemetry variables row for security touch */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/40 border border-white/[0.02] font-mono text-[9px] text-slate-500">
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="space-y-0.5">
                <span className="text-slate-600 uppercase tracking-wider block text-[8px]">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-slate-300 font-bold block truncate">{val}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Footer row */}
        <div className="space-y-5 pt-6 border-t border-white/[0.03] mt-6">
          
          {/* Tech pills row */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                {tag}
              </span>
            ))}
          </div>

          {/* Dynamic Buttons triggers */}
          <div className="flex justify-between items-center text-xs font-mono">
            <Button variant="text" href={project.codeLink} className="p-0 text-slate-400 hover:text-white flex items-center space-x-1 font-bold group/btn text-[10px] uppercase tracking-wider">
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
                  className="text-[10px] font-mono text-brand-primary hover:text-brand-accent font-black uppercase tracking-wider flex items-center space-x-1.5 transition-colors group/case"
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
