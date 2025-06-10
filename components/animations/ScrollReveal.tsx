'use client';

import React from 'react';
import { motion, AnimationProps } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { framerEasing } from '@/lib/easing';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  easing?: keyof typeof framerEasing;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  as?: React.ElementType;
}

const getAnimationVariants = (
  direction: string,
  distance: number,
  duration: number,
  delay: number,
  easing: any
) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    fade: { opacity: 0 }
  };

  const initial = {
    opacity: direction === 'fade' ? 0 : 1,
    ...(directions[direction as keyof typeof directions] || directions.fade)
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: easing
    }
  };

  return { initial, animate };
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  easing = 'expo',
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  as: Component = 'div'
}: ScrollRevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -100px 0px'
  });

  const easingFunction = framerEasing[easing]?.inOut || framerEasing.expo.inOut;
  const { initial, animate } = getAnimationVariants(
    direction,
    distance,
    duration,
    delay,
    easingFunction
  );

  return (
    <motion.div
      ref={ref as any}
      initial={initial}
      animate={isIntersecting ? animate : initial}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for common use cases
export function FadeIn({ children, delay = 0, duration = 0.6, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      direction="fade"
      delay={delay}
      duration={duration}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}

export function SlideUp({ children, delay = 0, duration = 0.6, distance = 50, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      direction="up"
      delay={delay}
      duration={duration}
      distance={distance}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}

export function SlideLeft({ children, delay = 0, duration = 0.6, distance = 50, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      direction="left"
      delay={delay}
      duration={duration}
      distance={distance}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}

export function SlideRight({ children, delay = 0, duration = 0.6, distance = 50, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      direction="right"
      delay={delay}
      duration={duration}
      distance={distance}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
} 