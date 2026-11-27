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
    'inline-flex items-center justify-center font-mono font-semibold tracking-wider transition-[transform,background-color,border-color,box-shadow,color] duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60';

  const variants = {
    primary: 'px-5 py-3 text-xs liquid-btn-primary liquid-rim',
    secondary: 'px-5 py-3 text-xs liquid-btn-secondary liquid-rim text-zinc-950 dark:text-white',
    outline:
      'px-5 py-3 text-xs text-zinc-950 dark:text-white liquid-glass-well liquid-rim hover:opacity-90',
    text: 'px-3 py-2 text-xs text-zinc-900 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white bg-transparent'
  };

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      className="relative z-10 flex items-center justify-center space-x-2"
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
