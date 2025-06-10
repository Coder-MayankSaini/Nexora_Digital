'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  imageUrl: string;
  height?: string;
  speed?: number;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
}

export default function ParallaxImage({
  imageUrl,
  height = "100vh",
  speed = 0.5,
  overlay = true,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  className = ""
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  
  return (
    <div 
      ref={ref}
      style={{ height }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{ y }}
      >
        <div 
          className="h-[130%] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      </motion.div>
      
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{ backgroundColor: overlayColor }}
        />
      )}
    </div>
  );
} 