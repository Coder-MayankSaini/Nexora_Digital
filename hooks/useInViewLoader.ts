'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook to track when an element is in the viewport
 * @param options Optional configuration
 * @returns Reference and boolean indicating if element is in view
 */
export function useInViewLoader(options: { 
  threshold?: number; 
  once?: boolean;
} = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.once !== undefined ? options.once : true,
    amount: options.threshold || 0.1
  });

  return { ref, isInView };
}

export default useInViewLoader; 