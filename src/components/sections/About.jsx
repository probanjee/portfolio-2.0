import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Network, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Card from '../ui/Card';

export const About = () => {
  const { about } = portfolioData;

  const bioSentences = about.description
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const highlights = [
    {
      title: "Full-Stack Engineering",
      icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
      description: "Building responsive web interfaces, API-driven applications, and modern software systems with clean structure and usability.",
    },
    {
      title: "Cybersecurity Systems",
      icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
      description: "Exploring cybersecurity fundamentals through honeypot systems, threat logging, encryption tools, and security-focused architecture.",
    },
    {
      title: "C/C++ Problem Solving",
      icon: <Cpu className="w-5 h-5" aria-hidden="true" />,
      description: "Practicing algorithmic thinking, object-oriented programming, STL concepts, and memory-conscious development in C and C++.",
    },
    {
      title: "API & Backend Architecture",
      icon: <Network className="w-5 h-5" aria-hidden="true" />,
      description: "Developing backend designs through API systems, automation workflows, data handling, and service-oriented structures.",
    }
  ];

  return (
    <section id="about" className="scroll-mt-24 py-12 sm:py-16 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10">

        {/* Left Column: Scannable Biography & Key Metrics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2.5">
            <motion.h2
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono text-[#087F79] dark:text-[#55D6C8] uppercase tracking-widest font-semibold"
            >
              &gt;_ Architectural Profile
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-[#17202B] dark:text-[#F4F6F8]"
            >
              {about.title}
            </motion.h3>
            <p className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] font-medium leading-relaxed">
              {about.subtitle}
            </p>
          </div>

          {/* Structured scannable biography points */}
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="space-y-2.5 border-l-2 border-[#087F79]/35 dark:border-[#55D6C8]/35 pl-4"
          >
            {bioSentences.map((sentence, idx) => (
              <li key={idx} className="text-sm text-[#5B6573] dark:text-[#A7B0BC] leading-relaxed font-sans">
                {sentence}
              </li>
            ))}
          </motion.ul>

          {/* Compact Metric Strip */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#17202B]/10 dark:border-white/[0.08]">
            {about.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#E8EDF1]/85 dark:bg-[#1D242E]/85 border border-[#17202B]/[0.06] dark:border-white/[0.06] flex flex-col justify-center space-y-1"
              >
                <span className="text-xl font-bold font-mono text-[#087F79] dark:text-[#55D6C8] tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono text-[#5B6573] dark:text-[#A7B0BC] font-medium">
                  {metric.label === 'C/C++ Core Focus' ? 'Software & Backend' : metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Clean 4 Domain Cards without Decorative Noise */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              key={card.title}
              className="h-full"
            >
              <Card className="h-full flex flex-col justify-start p-5 sm:p-6 space-y-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#E8EDF1] dark:bg-[#1D242E] text-[#087F79] dark:text-[#55D6C8] flex items-center justify-center shrink-0">
                  {card.icon}
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#17202B] dark:text-[#F4F6F8] group-hover:text-[#087F79] dark:group-hover:text-[#55D6C8] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B6573] dark:text-[#A7B0BC] font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
