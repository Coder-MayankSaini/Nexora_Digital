'use client';

import { motion } from 'framer-motion';
import { createElement } from 'react';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function TextReveal({
  text,
  as = 'p',
  delay = 0,
  duration = 0.8,
  className = '',
  direction = 'up'
}: TextRevealProps) {
  // Calculate the initial and animate properties based on direction
  const getMotionProps = () => {
    switch (direction) {
      case 'up':
        return { initial: { y: 100 }, animate: { y: 0 } };
      case 'down':
        return { initial: { y: -100 }, animate: { y: 0 } };
      case 'left':
        return { initial: { x: 100 }, animate: { x: 0 } };
      case 'right':
        return { initial: { x: -100 }, animate: { x: 0 } };
      default:
        return { initial: { y: 100 }, animate: { y: 0 } };
    }
  };

  const { initial, animate } = getMotionProps();

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ ...initial, opacity: 0 }}
        animate={{ ...animate, opacity: 1 }}
        transition={{ 
          duration: duration,
          delay: delay,
          ease: [0.33, 1, 0.68, 1]
        }}
      >
        {createElement(as, { className }, text)}
      </motion.div>
    </div>
  );
} 