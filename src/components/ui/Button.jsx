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
  const baseStyles = 'inline-flex items-center justify-center font-mono font-semibold tracking-wider transition-all duration-300 rounded-xl focus:outline-none';
  
  const variants = {
    primary: 'px-5 py-3 text-xs text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] border border-brand-primary/20',
    secondary: 'px-5 py-3 text-xs text-slate-300 light:text-slate-700 bg-white/5 light:bg-slate-200 hover:bg-white/10 light:hover:bg-slate-300 border border-white/5 light:border-black/5',
    outline: 'px-5 py-3 text-xs text-brand-primary bg-transparent border border-brand-primary/30 hover:bg-brand-primary/10',
    text: 'px-3 py-2 text-xs text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900 bg-transparent'
  };

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center space-x-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={download ? "_blank" : undefined}
        rel={download ? "noopener noreferrer" : undefined}
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
