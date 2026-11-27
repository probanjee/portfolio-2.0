import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { getSkillIcon } from '../ui/TechLogos';

export const Skills = () => {
  // 6 Skill groups matching PRD and Architecture
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "C++17", "Python", "Java", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"],
      accent: "rgba(59, 130, 246, 0.25)",
      badgeColor: "group-hover:text-brand-primary group-hover:border-brand-primary/25"
    },
    {
      title: "Frontend",
      skills: ["React", "Tailwind CSS", "Framer Motion", "Responsive UI", "Glassmorphism", "Component Architecture", "React.js", "Angular", "Vue.js"],
      accent: "rgba(139, 92, 246, 0.25)",
      badgeColor: "group-hover:text-brand-secondary group-hover:border-brand-secondary/25"
    },
    {
      title: "Backend",
      skills: ["FastAPI", "API Design", "Backend Frameworks", "Automation", "Data Processing", "REST API"],
      accent: "rgba(6, 182, 212, 0.25)",
      badgeColor: "group-hover:text-brand-accent group-hover:border-brand-accent/25"
    },
    {
      title: "Cybersecurity",
      skills: ["Cybersecurity Fundamentals", "Penetration Testing", "Security Monitoring", "Honeypot Systems", "Encryption", "Unit Testing", "Jest", "JUnit"],
      accent: "rgba(239, 68, 68, 0.25)",
      badgeColor: "group-hover:text-red-400 group-hover:border-red-400/25"
    },
    {
      title: "Tools & Platforms",
      skills: ["GitHub", "OpenAI API", "Power BI", "AWS", "Linux", "Kali Linux", "Microsoft Azure", "Docker", "Jira", "CI/CD"],
      accent: "rgba(129, 140, 248, 0.25)",
      badgeColor: "group-hover:text-indigo-400 group-hover:border-indigo-400/25"
    },
    {
      title: "System Concepts",
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
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-12">

        {/* SECTION HEADER */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-widest"
          >
            &gt;_ CAPABILITIES MATRIX
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            Technical Framework &amp; Knowledge Domains
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
          {skillCategories.map((cat) => (
            <motion.div
              variants={cardVariants}
              key={cat.title}
              className="h-full group"
            >
              <Card
                hoverEffect={false}
                className="p-6 sm:p-7 h-full flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                <div className="space-y-5 relative z-10">

                  {/* Category Header Row */}
                  <div className="pb-3 border-b border-slate-900/[0.08] dark:border-white/[0.08]">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-wide">
                      {cat.title}
                    </h4>
                  </div>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => {
                      const icon = getSkillIcon(skill, "w-3.5 h-3.5");
                      return (
                        <motion.span
                          key={skill}
                          whileHover={{ y: -1.5 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center rounded-full text-[11px] font-mono font-semibold liquid-glass-well text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-white cursor-default transition-colors px-3 py-1.5 space-x-2"
                        >
                          {icon && (
                            <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                              {icon}
                            </span>
                          )}
                          <span>{skill}</span>
                        </motion.span>
                      );
                    })}
                  </div>

                </div>

                {/* Simulated Decryption Key Code bar */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-900/[0.08] dark:border-white/[0.08] text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold relative z-10">
                  <span>CAPABILITY::ENCRYPT</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse mr-1" />
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
