import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass-panel glow-border rounded-3xl p-6 ${
        hoverEffect ? 'card-hover-effect glow-border-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
