import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  href,
  download
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-mono font-semibold tracking-wider transition-[transform,background-color,border-color,box-shadow,color] duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50';

  const variants = {
    primary: 'px-5 py-3 text-xs liquid-btn-primary',
    secondary: 'px-5 py-3 text-xs liquid-btn-secondary',
    outline:
      'px-5 py-3 text-xs text-blue-600 dark:text-sky-400 bg-blue-500/[0.08] dark:bg-sky-400/[0.08] border border-blue-500/25 dark:border-sky-400/25 hover:bg-blue-500/15 dark:hover:bg-sky-400/15 backdrop-blur-md',
    text: 'px-3 py-2 text-xs text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 bg-transparent'
  };

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center justify-center space-x-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
    return (
      <a
        href={href}
        download={download}
        target={download || isExternal ? '_blank' : undefined}
        rel={download || isExternal ? 'noopener noreferrer' : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
