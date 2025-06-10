'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  targetId?: string;
  color?: string;
  text?: string;
  className?: string;
}

export default function ScrollIndicator({
  targetId,
  color = 'white',
  text = 'Scroll Down',
  className = ''
}: ScrollIndicatorProps) {
  const textColorClass = color === 'white' ? 'text-white' : color === 'black' ? 'text-black' : 'text-white';
  
  return (
    <motion.div 
      className={`flex flex-col items-center cursor-pointer ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: [0.3, 1, 0.3], 
        y: [0, 10, 0] 
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={() => {
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }
      }}
    >
      {text && <span className={`${textColorClass} text-sm mb-2`}>{text}</span>}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={textColorClass}
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </motion.div>
  );
} 