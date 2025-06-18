'use client';

import { motion } from 'framer-motion';

interface FaviconProps {
  size?: number;
  className?: string;
}

export const Favicon = ({ size = 24, className = "" }: FaviconProps) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.div 
        className="absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span className="font-serif font-bold text-white" style={{ fontSize: size * 0.65 }}>N</span>
      </motion.div>
    </div>
  );
}; 