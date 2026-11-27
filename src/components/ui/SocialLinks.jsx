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
      hoverClass: 'hover:text-black dark:hover:text-white',
    },
    github && {
      id: 'github',
      label: 'GitHub',
      href: github,
      external: true,
      Icon: Github,
      hoverClass: 'hover:text-black dark:hover:text-white',
    },
    leetcode && {
      id: 'leetcode',
      label: 'LeetCode',
      href: leetcode,
      external: true,
      Icon: LeetCodeIcon,
      hoverClass: 'hover:text-black dark:hover:text-white',
    },
    email && {
      id: 'mail',
      label: 'Email',
      href: `mailto:${email}`,
      external: false,
      Icon: Mail,
      hoverClass: 'hover:text-black dark:hover:text-white',
    },
    instagram && {
      id: 'instagram',
      label: 'Instagram',
      href: instagram,
      external: true,
      Icon: Instagram,
      hoverClass: 'hover:text-black dark:hover:text-white',
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
          className={`p-2.5 sm:p-3 rounded-full liquid-glass-well liquid-rim card-hover-effect text-zinc-950 dark:text-white ${hoverClass} hover:-translate-y-0.5 transition-[transform,color] duration-200 inline-flex items-center justify-center`}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
