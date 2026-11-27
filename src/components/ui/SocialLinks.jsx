import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { LeetCodeIcon } from './Icons';

export const SocialLinks = ({ className = '', iconClassName = 'w-4 h-4' }) => {
  const { email, github, linkedin, leetcode, instagram } = portfolioData.personalInfo;

  const links = [
    linkedin && {
      id: 'linkedin',
      label: 'LinkedIn',
      href: linkedin,
      external: true,
      Icon: Linkedin,
      hoverClass: 'hover:text-[#0A66C2] dark:hover:text-sky-400',
    },
    github && {
      id: 'github',
      label: 'GitHub',
      href: github,
      external: true,
      Icon: Github,
      hoverClass: 'hover:text-slate-950 dark:hover:text-white',
    },
    leetcode && {
      id: 'leetcode',
      label: 'LeetCode',
      href: leetcode,
      external: true,
      Icon: LeetCodeIcon,
      hoverClass: 'hover:text-amber-600 dark:hover:text-amber-400',
    },
    email && {
      id: 'mail',
      label: 'Email',
      href: `mailto:${email}`,
      external: false,
      Icon: Mail,
      hoverClass: 'hover:text-blue-600 dark:hover:text-sky-400',
    },
    instagram && {
      id: 'instagram',
      label: 'Instagram',
      href: instagram,
      external: true,
      Icon: Instagram,
      hoverClass: 'hover:text-pink-600 dark:hover:text-pink-400',
    },
  ].filter(Boolean);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map(({ id, label, href, external, Icon, hoverClass }) => (
        <a
          key={id}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          title={label}
          aria-label={label}
          className={`p-2.5 sm:p-3 rounded-full liquid-glass-well liquid-rim text-slate-600 dark:text-slate-300 ${hoverClass} hover:-translate-y-0.5 transition-[transform,color] duration-200 inline-flex items-center justify-center`}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
