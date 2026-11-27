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
    'inline-flex items-center justify-center font-mono font-semibold tracking-wider transition-[transform,background-color,border-color,box-shadow,color] duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3F5F7] dark:focus-visible:ring-offset-[#0B0D10]';

  const variants = {
    primary: 'px-5 py-3 text-xs liquid-btn-primary',
    secondary: 'px-5 py-3 text-xs liquid-btn-secondary',
    outline:
      'px-5 py-3 text-xs text-[#087F79] dark:text-[#55D6C8] bg-[#E8EDF1]/85 dark:bg-[#1D242E]/85 border border-[#087F79]/30 dark:border-[#55D6C8]/30 hover:border-[#087F79]/60 dark:hover:border-[#55D6C8]/60 hover:bg-[#087F79]/10 dark:hover:bg-[#55D6C8]/10',
    text: 'px-3 py-2 text-xs text-[#5B6573] hover:text-[#17202B] dark:text-[#A7B0BC] dark:hover:text-[#F4F6F8] bg-transparent'
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
