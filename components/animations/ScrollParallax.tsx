'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useParallax, useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

export default function ScrollParallax({
  children,
  strength = 50,
  className = '',
  direction = 'vertical',
  reverse = false
}: ScrollParallaxProps) {
  const { ref, y } = useParallax(reverse ? -strength : strength);

  return (
    <motion.div
      ref={ref as any}
      style={direction === 'vertical' ? { y } : { x: y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized parallax components
export function ParallaxImage({
  src,
  alt,
  strength = 30,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  strength?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className="overflow-hidden">
      <ScrollParallax strength={strength} className={className}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover scale-110"
          {...props}
        />
      </ScrollParallax>
    </div>
  );
}

export function ParallaxText({
  children,
  strength = 20,
  className = '',
  direction = 'vertical'
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}) {
  return (
    <ScrollParallax
      strength={strength}
      direction={direction}
      className={className}
    >
      {children}
    </ScrollParallax>
  );
}

// Multi-layer parallax effect
export function LayeredParallax({
  children,
  layers = [20, 40, 60],
  className = ''
}: {
  children: React.ReactNode[];
  layers?: number[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child, index) => {
        const strength = layers[index] || 20;
        return (
          <ScrollParallax
            key={index}
            strength={strength}
            className="absolute inset-0"
          >
            {child}
          </ScrollParallax>
        );
      })}
    </div>
  );
} 