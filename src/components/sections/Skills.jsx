import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CodeXml,
  Cpu,
  Database,
  Layers,
  Link2,
  Lock,
  MonitorSmartphone,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';
import {
  CICDLogo,
  CyberSecurityBadge,
  DSABadge,
  getSkillIcon,
} from '../ui/TechLogos';

const CATEGORY_TABS = [
  { id: 'All', label: 'All', Icon: null },
  { id: 'Programming', label: 'Programming', Icon: CodeXml },
  { id: 'Cybersecurity', label: 'Cybersecurity', Icon: Shield },
  { id: 'Full Stack', label: 'Full Stack', Icon: Layers },
  { id: 'Databases & Cloud', label: 'Databases & Cloud', Icon: Database },
  { id: 'DevOps & Concepts', label: 'Tools & Concepts', Icon: Settings },
];

const SKILLS_CATALOG = [
  // Programming
  { name: 'C', category: 'Programming', badge: 'Systems' },
  { name: 'C++17', category: 'Programming', badge: 'Core' },
  { name: 'Python', category: 'Programming', badge: 'Primary' },
  { name: 'Java', category: 'Programming', badge: 'OOP' },
  { name: 'JavaScript (ES6+)', category: 'Programming', badge: 'Web' },
  { name: 'HTML5', category: 'Programming', badge: 'Markup' },
  { name: 'CSS3', category: 'Programming', badge: 'Style' },
  { name: 'SQL', category: 'Programming', badge: 'Queries' },

  // Cybersecurity
  { name: 'Cybersecurity Fundamentals', category: 'Cybersecurity', badge: 'Core' },
  { name: 'Penetration Testing', category: 'Cybersecurity', badge: 'Security' },
  { name: 'Security Monitoring', category: 'Cybersecurity', badge: 'SOC' },
  { name: 'Honeypot Systems', category: 'Cybersecurity', badge: 'Defense' },
  { name: 'Encryption', category: 'Cybersecurity', badge: 'Crypto' },
  { name: 'Unit Testing', category: 'Cybersecurity', badge: 'QA' },
  { name: 'Jest', category: 'Cybersecurity', badge: 'Testing' },
  { name: 'JUnit', category: 'Cybersecurity', badge: 'Testing' },

  // Full Stack
  { name: 'React', category: 'Full Stack', badge: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Full Stack', badge: 'Style' },
  { name: 'Framer Motion', category: 'Full Stack', badge: 'Motion' },
  { name: 'Angular', category: 'Full Stack', badge: 'Frontend' },
  { name: 'Vue.js', category: 'Full Stack', badge: 'Frontend' },
  { name: 'FastAPI', category: 'Full Stack', badge: 'API' },
  { name: 'REST API', category: 'Full Stack', badge: 'Protocol' },
  { name: 'API Design', category: 'Full Stack', badge: 'Schema' },
  { name: 'Backend Frameworks', category: 'Full Stack', badge: 'Server' },
  { name: 'Responsive UI', category: 'Full Stack', badge: 'Layout' },
  { name: 'Glassmorphism', category: 'Full Stack', badge: 'UI Design' },
  { name: 'Component Architecture', category: 'Full Stack', badge: 'Patterns' },
  { name: 'Automation', category: 'Full Stack', badge: 'Scripts' },
  { name: 'Data Processing', category: 'Full Stack', badge: 'Pipelines' },

  // Databases & Cloud
  { name: 'PostgreSQL', category: 'Databases & Cloud', badge: 'SQL' },
  { name: 'MySQL', category: 'Databases & Cloud', badge: 'SQL' },
  { name: 'MongoDB (NoSQL)', category: 'Databases & Cloud', badge: 'NoSQL' },
  { name: 'Docker', category: 'Databases & Cloud', badge: 'Container' },
  { name: 'Linux', category: 'Databases & Cloud', badge: 'OS' },
  { name: 'Kali Linux', category: 'Databases & Cloud', badge: 'Security OS' },
  { name: 'AWS', category: 'Databases & Cloud', badge: 'Cloud' },
  { name: 'Microsoft Azure', category: 'Databases & Cloud', badge: 'Cloud' },

  // Tools & Concepts
  { name: 'GitHub', category: 'DevOps & Concepts', badge: 'VCS' },
  { name: 'CI/CD', category: 'DevOps & Concepts', badge: 'Pipeline' },
  { name: 'OpenAI API', category: 'DevOps & Concepts', badge: 'AI API' },
  { name: 'Power BI', category: 'DevOps & Concepts', badge: 'Analytics' },
  { name: 'Jira', category: 'DevOps & Concepts', badge: 'Tracking' },
  { name: 'DSA', category: 'DevOps & Concepts', badge: 'Algorithms' },
  { name: 'OOP', category: 'DevOps & Concepts', badge: 'Design' },
  { name: 'STL', category: 'DevOps & Concepts', badge: 'C++ Lib' },
  { name: 'Automation Systems', category: 'DevOps & Concepts', badge: 'Workflow' },
  { name: 'IoT Integration', category: 'DevOps & Concepts', badge: 'Hardware' },
  { name: 'Sensor Data Processing', category: 'DevOps & Concepts', badge: 'Telemetry' },
  { name: 'Agile', category: 'DevOps & Concepts', badge: 'Delivery' },
  { name: 'Scrum', category: 'DevOps & Concepts', badge: 'Delivery' },
  { name: 'Kanban', category: 'DevOps & Concepts', badge: 'Delivery' },
  { name: 'Scrumban', category: 'DevOps & Concepts', badge: 'Delivery' },
];

const renderConceptIcon = (skillName) => {
  const s = skillName.toLowerCase();
  const iconCls = 'w-5 h-5 sm:w-6 sm:h-6';

  if (s === 'ci/cd') return <CICDLogo className="w-6 h-6 sm:w-7 sm:h-7" />;
  if (s === 'dsa') return <DSABadge className="w-6 h-6 sm:w-7 sm:h-7" />;
  if (s.includes('honeypot') || s.includes('cybersecurity')) {
    return <CyberSecurityBadge className="w-6 h-6 sm:w-7 sm:h-7" />;
  }
  if (s.includes('encryption')) return <Lock className={`${iconCls} text-amber-500 dark:text-amber-400`} />;
  if (s.includes('penetration') || s.includes('monitoring')) {
    return <ShieldAlert className={`${iconCls} text-rose-500 dark:text-rose-400`} />;
  }
  if (s.includes('unit testing')) return <Terminal className={`${iconCls} text-emerald-600 dark:text-emerald-400`} />;
  if (s.includes('rest api') || s.includes('api design')) {
    return <Link2 className={`${iconCls} text-cyan-600 dark:text-cyan-400`} />;
  }
  if (s.includes('backend')) return <Server className={`${iconCls} text-blue-600 dark:text-sky-400`} />;
  if (s.includes('responsive')) {
    return <MonitorSmartphone className={`${iconCls} text-indigo-600 dark:text-indigo-400`} />;
  }
  if (s.includes('glassmorphism')) return <Sparkles className={`${iconCls} text-sky-500 dark:text-sky-300`} />;
  if (s.includes('component') || s === 'oop' || s === 'stl') {
    return <Layers className={`${iconCls} text-violet-600 dark:text-violet-400`} />;
  }
  if (s.includes('iot')) return <Cpu className={`${iconCls} text-teal-600 dark:text-teal-400`} />;
  if (s.includes('sensor') || s.includes('data processing')) {
    return <Activity className={`${iconCls} text-emerald-600 dark:text-emerald-400`} />;
  }
  return <Workflow className={`${iconCls} text-blue-600 dark:text-sky-400`} />;
};

const renderSkillTileIcon = (skillName) =>
  getSkillIcon(skillName, 'w-6 h-6 sm:w-7 sm:h-7') || renderConceptIcon(skillName);

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');

  const visibleSkills = useMemo(() => {
    if (activeTab === 'All') return SKILLS_CATALOG;
    return SKILLS_CATALOG.filter((skill) => skill.category === activeTab);
  }, [activeTab]);

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24 relative overflow-hidden">
      <div className="space-y-10">

        {/* Centered Section Header matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center space-y-3"
        >
          <p className="text-xs font-mono text-blue-600 dark:text-sky-400 uppercase tracking-[0.2em] font-semibold">
            TECH STACK
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Technologies I Work With
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            From low-level C/C++ systems and cybersecurity telemetry to full-stack web architectures — my toolkit spans multiple domains
          </p>
        </motion.div>

        {/* Interactive Category Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto"
          role="tablist"
          aria-label="Filter technologies by category"
        >
          {CATEGORY_TABS.map(({ id, label, Icon }) => {
            const isSelected = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.35)] dark:shadow-[0_8px_22px_-6px_rgba(255,255,255,0.28)]'
                    : 'liquid-glass-well text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Count Pill */}
        <div className="flex items-center justify-center">
          <span className="text-xs font-mono px-3.5 py-1 rounded-full liquid-glass-well text-slate-600 dark:text-slate-400">
            {visibleSkills.length} {activeTab === 'All' ? 'technologies total' : `in ${activeTab}`}
          </span>
        </div>

        {/* Dense Responsive Tile Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 pointer-events-auto"
        >
          {visibleSkills.map((skill) => (
            <div
              key={skill.name}
              title={skill.name}
              className="group flex flex-col items-center justify-between gap-2 p-3 sm:p-4 rounded-2xl glass-panel liquid-rim card-hover-effect cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl liquid-glass-well transition-transform duration-300 group-hover:scale-110">
                {renderSkillTileIcon(skill.name)}
              </div>

              <span className="text-xs font-semibold text-center leading-tight line-clamp-1 text-slate-900 dark:text-slate-100">
                {skill.name}
              </span>

              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 border border-blue-500/25 dark:bg-sky-400/12 dark:text-sky-300 dark:border-sky-400/25 whitespace-nowrap">
                {skill.badge}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
