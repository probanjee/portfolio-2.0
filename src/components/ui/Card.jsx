import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel rounded-2xl p-6 ${
        hoverEffect ? 'card-hover-effect' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
