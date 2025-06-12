'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  lazyLoad?: boolean;
  fadeIn?: boolean;
  revealOnScroll?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/placeholder.svg',
  lazyLoad = true,
  fadeIn = true,
  revealOnScroll = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  // Set loading priority based on lazyLoad prop
  const loadingProp = lazyLoad ? 'lazy' : 'eager';
  // Set fetchPriority based on lazyLoad prop
  const fetchPriorityProp = lazyLoad ? 'low' : 'high';
  
  // The actual src to display (fallback or original)
  const displaySrc = hasError ? fallbackSrc : src;

  // Classes to apply based on loading state
  const imageClasses = `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${fadeIn ? 'transition-opacity duration-500' : ''}`;

  // Optional wrapper if animation is needed
  const ImageComponent = (
    <Image
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={loadingProp}
      fetchPriority={fetchPriorityProp as 'high' | 'low' | 'auto'}
      onLoadingComplete={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={imageClasses}
      style={style}
      {...props}
    />
  );

  // If reveal on scroll, wrap in motion.div
  if (revealOnScroll) {
    return (
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {ImageComponent}
      </motion.div>
    );
  }

  return ImageComponent;
} 