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
    },
    github && {
      id: 'github',
      label: 'GitHub',
      href: github,
      external: true,
      Icon: Github,
    },
    leetcode && {
      id: 'leetcode',
      label: 'LeetCode',
      href: leetcode,
      external: true,
      Icon: LeetCodeIcon,
    },
    email && {
      id: 'mail',
      label: 'Email',
      href: `mailto:${email}`,
      external: false,
      Icon: Mail,
    },
    instagram && {
      id: 'instagram',
      label: 'Instagram',
      href: instagram,
      external: true,
      Icon: Instagram,
    },
  ].filter(Boolean);

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map(({ id, label, href, external, Icon }) => (
        <a
          key={id}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          title={label}
          aria-label={label}
          className="p-2.5 rounded-full liquid-glass-well text-[#5B6573] dark:text-[#A7B0BC] hover:text-[#087F79] dark:hover:text-[#55D6C8] hover:border-[#087F79]/40 dark:hover:border-[#55D6C8]/40 transition-colors duration-200 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
        >
          <Icon className={iconClassName} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
