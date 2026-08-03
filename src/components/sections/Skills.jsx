import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layout, Cpu, Shield, Globe, BookOpen } from 'lucide-react';
import Card from '../ui/Card';

export const Skills = () => {
  // 6 Premium High-Fidelity skill groups matching PRD and Phase 8
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Terminal className="w-4 h-4 text-brand-primary animate-pulse" />,
      skills: ["C", "C++17", "Python", "Java", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"],
      accent: "rgba(59, 130, 246, 0.25)",
      badgeColor: "group-hover:text-brand-primary group-hover:border-brand-primary/25"
    },
    {
      title: "Frontend",
      icon: <Layout className="w-4 h-4 text-brand-secondary animate-pulse" />,
      skills: ["React", "Tailwind CSS", "Framer Motion", "Responsive UI", "Glassmorphism", "Component Architecture", "React.js", "Angular", "Vue.js"],
      accent: "rgba(139, 92, 246, 0.25)",
      badgeColor: "group-hover:text-brand-secondary group-hover:border-brand-secondary/25"
    },
    {
      title: "Backend",
      icon: <Cpu className="w-4 h-4 text-brand-accent animate-pulse" />,
      skills: ["FastAPI", "API Design", "Backend Frameworks", "Automation", "Data Processing", "REST API"],
      accent: "rgba(6, 182, 212, 0.25)",
      badgeColor: "group-hover:text-brand-accent group-hover:border-brand-accent/25"
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="w-4 h-4 text-red-400 animate-pulse" />,
      skills: ["Cybersecurity Fundamentals", "Penetration Testing", "Security Monitoring", "Honeypot Systems", "Encryption", "Unit Testing", "Jest", "JUnit"],
      accent: "rgba(239, 68, 68, 0.25)",
      badgeColor: "group-hover:text-red-400 group-hover:border-red-400/25"
    },
    {
      title: "Tools & Platforms",
      icon: <Globe className="w-4 h-4 text-indigo-400 animate-pulse" />,
      skills: ["GitHub", "OpenAI API", "Power BI", "AWS", "Linux", "Kali Linux", "Microsoft Azure", "Docker", "Jira", "CI/CD"],
      accent: "rgba(129, 140, 248, 0.25)",
      badgeColor: "group-hover:text-indigo-400 group-hover:border-indigo-400/25"
    },
    {
      title: "System Concepts",
      icon: <BookOpen className="w-4 h-4 text-emerald-400 animate-pulse" />,
      skills: ["DSA", "OOP", "STL", "Automation Systems", "IoT Integration", "Sensor Data Processing", "PostgreSQL", "MySQL", "MongoDB (NoSQL)", "Agile", "Scrum", "Kanban", "Scrumban"],
      accent: "rgba(52, 211, 153, 0.25)",
      badgeColor: "group-hover:text-emerald-400 group-hover:border-emerald-400/25"
    }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 25 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden select-none">
      <div className="space-y-12">

        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-brand-primary uppercase tracking-widest"
          >
            &gt;_ CAPABILITIES MATRIX
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Technical Framework & Knowledge Domains
          </motion.h3>
        </div>

        {/* 6-COLUMN RESPONSIVE SKILLS MATRIX */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pointer-events-auto"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              variants={cardVariants}
              key={cat.title}
              className="h-full group"
            >
              <Card
                hoverEffect={false}
                className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 border border-white/[0.03] bg-[#02050D]/30 backdrop-blur-md hover:border-white/10 hover:shadow-[0_16px_40px_rgba(2,5,13,0.4)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent Soft Halo Glow inside individual card */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${cat.accent} 0%, transparent 50%)`
                  }}
                />

                <div className="space-y-6 relative z-10">

                  {/* Category Header Row */}
                  <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.03]">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-white/[0.04] flex items-center justify-center shadow-inner group-hover:border-white/10 transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-200 group-hover:text-slate-100 transition-colors font-mono">
                      {cat.title}
                    </h4>
                  </div>

                  {/* Magnetic Glowing skill chips container */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map(skill => (
                      <motion.span
                        key={skill}
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          color: '#fff',
                          borderColor: cat.accent.replace('0.25', '0.5'),
                          boxShadow: `0 0 15px ${cat.accent.replace('0.25', '0.4')}`
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 14
                        }}
                        className="px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold border border-white/[0.03] bg-slate-950/50 text-slate-400 hover:bg-slate-950 hover:text-white cursor-pointer transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                </div>

                {/* Simulated Decryption Key Code bar for Tech-SaaS detailing */}
                <div className="flex justify-between items-center pt-4 border-t border-white/[0.03] text-[9px] font-mono text-slate-600 font-bold relative z-10">
                  <span>CAPABILITY::ENCRYPT</span>
                  <span className="text-emerald-500 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                    VERIFIED
                  </span>
                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
