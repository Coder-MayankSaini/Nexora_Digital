'use client';

import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';
import { mapRange, expo } from '@/lib/easing';

interface ScrollAnimationOptions {
  offset?: any; // Use any to match Framer Motion's flexible offset type
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  easingFunction?: (t: number) => number;
}

interface ScrollAnimationReturn {
  ref: RefObject<HTMLElement | null>;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  transforms: {
    y: MotionValue<number>;
    x: MotionValue<number>;
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    rotate: MotionValue<number>;
  };
}

export function useScrollAnimation({
  offset = ["start end", "end start"],
  spring = { stiffness: 100, damping: 30, mass: 1 },
  easingFunction = expo.inOut
}: ScrollAnimationOptions = {}): ScrollAnimationReturn {
  const ref = useRef<HTMLElement | null>(null);
  
  // Get scroll progress for the target element
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });

  // Create smooth spring animations
  const smoothY = useSpring(scrollY, spring);
  const smoothProgress = useSpring(scrollYProgress, spring);

  // Transform functions for common animations
  const transforms = {
    // Parallax Y movement
    y: useTransform(smoothProgress, [0, 1], [0, -100]),
    
    // Horizontal movement
    x: useTransform(smoothProgress, [0, 1], [-100, 100]),
    
    // Fade in/out
    opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
    
    // Scale animation
    scale: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]),
    
    // Rotation
    rotate: useTransform(smoothProgress, [0, 1], [0, 360])
  };

  return {
    ref,
    scrollY: smoothY,
    scrollYProgress: smoothProgress,
    transforms
  };
}

// Hook for scroll-triggered animations with custom ranges
export function useScrollTrigger(
  inputRange: number[],
  outputRange: number[],
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  });

  const transform = useTransform(scrollYProgress, inputRange, outputRange);
  const smoothTransform = useSpring(transform, options.spring);

  return { ref, value: smoothTransform, progress: scrollYProgress };
}

// Hook for parallax effects
export function useParallax(
  strength: number = 50,
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  });

  const y = useTransform(scrollY, (value) => value * strength * 0.01);
  const smoothY = useSpring(y, options.spring);

  return { ref, y: smoothY };
}

// Hook for stagger animations
export function useStaggeredReveal(
  itemCount: number,
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  });

  const staggeredAnimations = Array.from({ length: itemCount }, (_, index) => {
    const delay = index * 0.1;
    const start = Math.max(0, delay);
    const end = Math.min(1, start + 0.3);
    
    return {
      opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
      y: useTransform(scrollYProgress, [start, end], [50, 0]),
      scale: useTransform(scrollYProgress, [start, end], [0.9, 1])
    };
  });

  return { ref, animations: staggeredAnimations, progress: scrollYProgress };
}

// Hook for text reveal animations
export function useTextReveal(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start 0.8", "start 0.2"]
  });

  const transforms = {
    clipPath: useTransform(
      scrollYProgress,
      [0, 1],
      ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
    ),
    y: useTransform(scrollYProgress, [0, 1], [50, 0]),
    opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1])
  };

  return { ref, transforms, progress: scrollYProgress };
}

// Hook for morphing animations
export function useMorphAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  });

  const transforms = {
    borderRadius: useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      ["0%", "50%", "0%"]
    ),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]),
    rotate: useTransform(scrollYProgress, [0, 1], [0, 180])
  };

  return { ref, transforms, progress: scrollYProgress };
}

// Hook for image reveal animations
export function useImageReveal(direction: 'left' | 'right' | 'up' | 'down' = 'up') {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"]
  });

  const getClipPath = (progress: number) => {
    switch (direction) {
      case 'left':
        return `inset(0 ${100 - progress * 100}% 0 0)`;
      case 'right':
        return `inset(0 0 0 ${100 - progress * 100}%)`;
      case 'up':
        return `inset(${100 - progress * 100}% 0 0 0)`;
      case 'down':
        return `inset(0 0 ${100 - progress * 100}% 0)`;
      default:
        return `inset(${100 - progress * 100}% 0 0 0)`;
    }
  };

  const clipPath = useTransform(scrollYProgress, (progress) => getClipPath(progress));
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return { ref, clipPath, scale, progress: scrollYProgress };
}

// Hook for smooth scrolling between sections
export function useSmoothScroll() {
  const scrollToSection = (elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { scrollToSection, scrollToTop };
} 