'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStaggeredReveal } from '@/hooks/useScrollAnimation';
import { useMultipleIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { framerEasing } from '@/lib/easing';

interface StaggerRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  easing?: keyof typeof framerEasing;
  threshold?: number;
  className?: string;
}

export default function StaggerReveal({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  easing = 'expo',
  threshold = 0.1,
  className = ''
}: StaggerRevealProps) {
  const itemCount = React.Children.count(children);
  const { setRef, intersections } = useMultipleIntersectionObserver(itemCount, {
    threshold,
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px'
  });

  const getInitialState = (dir: string) => {
    switch (dir) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimateState = (delay: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: framerEasing[easing]?.inOut || framerEasing.expo.inOut
    }
  });

  const initialState = getInitialState(direction);

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        const isVisible = intersections[index];
        const delay = isVisible ? index * staggerDelay : 0;

        return (
          <motion.div
            key={index}
            ref={setRef(index)}
            initial={initialState}
            animate={isVisible ? getAnimateState(delay) : initialState}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

// Specialized stagger components
export function StaggerGrid({
  children,
  columns = 3,
  staggerDelay = 0.05,
  className = ''
}: {
  children: React.ReactNode[];
  columns?: number;
  staggerDelay?: number;
  className?: string;
}) {
  const gridCols = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-3';
  
  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      <StaggerReveal
        staggerDelay={staggerDelay}
        direction="up"
        distance={30}
      >
        {children}
      </StaggerReveal>
    </div>
  );
}

export function StaggerList({
  children,
  direction = 'up',
  staggerDelay = 0.1,
  className = ''
}: {
  children: React.ReactNode[];
  direction?: 'up' | 'down' | 'left' | 'right';
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <StaggerReveal
        staggerDelay={staggerDelay}
        direction={direction}
        distance={40}
      >
        {children}
      </StaggerReveal>
    </div>
  );
}

// Text stagger for word-by-word or letter-by-letter reveals
export function StaggerText({
  text,
  by = 'word',
  staggerDelay = 0.05,
  className = '',
  ...props
}: {
  text: string;
  by?: 'word' | 'letter';
  staggerDelay?: number;
  className?: string;
  [key: string]: any;
}) {
  const items = by === 'word' ? text.split(' ') : text.split('');
  const separator = by === 'word' ? ' ' : '';

  return (
    <span className={className} {...props}>
      <StaggerReveal
        staggerDelay={staggerDelay}
        direction="up"
        distance={20}
        duration={0.4}
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-block"
            style={{ marginRight: by === 'word' ? '0.25rem' : '0' }}
          >
            {item}
            {by === 'word' && index < items.length - 1 ? separator : ''}
          </span>
        ))}
      </StaggerReveal>
    </span>
  );
}

// Cards stagger with hover effects
export function StaggerCards({
  children,
  columns = 3,
  staggerDelay = 0.1,
  className = ''
}: {
  children: React.ReactNode[];
  columns?: number;
  staggerDelay?: number;
  className?: string;
}) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  
  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6 ${className}`}>
      <StaggerReveal
        staggerDelay={staggerDelay}
        direction="up"
        distance={60}
        duration={0.8}
        easing="back"
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10,
              transition: { duration: 0.3, ease: framerEasing.expo.out }
            }}
            className="transform-gpu"
          >
            {child}
          </motion.div>
        ))}
      </StaggerReveal>
    </div>
  );
} 