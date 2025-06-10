'use client';

import Image, { ImageProps } from 'next/image';
import { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ImageSkeleton } from './loading-skeleton';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  containerClassName?: string;
  errorComponent?: React.ReactNode;
  onLoadComplete?: () => void;
  onError?: () => void;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  blurDataURL?: string;
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    aspectRatio = 'aspect-video',
    fallbackSrc = '/images/placeholder.jpg',
    showSkeleton = true,
    skeletonClassName,
    containerClassName,
    errorComponent,
    onLoadComplete,
    onError,
    className,
    priority = false,
    quality = 85,
    blur = true,
    blurDataURL,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = () => {
      setIsLoading(false);
      onLoadComplete?.();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
        setIsLoading(true);
      }
      onError?.();
    };

    const generateBlurDataURL = (width = 8, height = 8) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, width, height);
      }
      return canvas.toDataURL();
    };

    const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

    if (hasError && errorComponent) {
      return <div className={containerClassName}>{errorComponent}</div>;
    }

    return (
      <div className={cn('relative overflow-hidden', aspectRatio, containerClassName)}>
        {/* Loading Skeleton */}
        {isLoading && showSkeleton && (
          <ImageSkeleton 
            className={cn('absolute inset-0', skeletonClassName)}
            aspectRatio=""
          />
        )}

        {/* Optimized Image */}
        <Image
          ref={ref}
          src={currentSrc}
          alt={alt}
          fill
          quality={quality}
          priority={priority}
          placeholder={blur ? 'blur' : 'empty'}
          blurDataURL={blur ? defaultBlurDataURL : undefined}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...props}
        />

        {/* Error State */}
        {hasError && !errorComponent && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="text-gray-400 mb-2">📷</div>
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

// Avatar Image Component
interface AvatarImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallbackInitials?: string;
}

export function AvatarImage({
  size = 'md',
  fallbackInitials,
  className,
  ...props
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const fallbackComponent = fallbackInitials ? (
    <div className={cn(
      'flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-full',
      sizeClasses[size]
    )}>
      {fallbackInitials}
    </div>
  ) : undefined;

  return (
    <OptimizedImage
      aspectRatio=""
      containerClassName={cn('rounded-full', sizeClasses[size])}
      errorComponent={fallbackComponent}
      className={cn('rounded-full', className)}
      {...props}
    />
  );
}

// Hero Image Component
interface HeroImageProps extends OptimizedImageProps {
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: string;
}

export function HeroImage({
  overlay = false,
  overlayColor = 'bg-black',
  overlayOpacity = 'bg-opacity-40',
  containerClassName,
  ...props
}: HeroImageProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <OptimizedImage
        priority
        quality={95}
        aspectRatio="aspect-[21/9]"
        {...props}
      />
      {overlay && (
        <div className={cn('absolute inset-0', overlayColor, overlayOpacity)} />
      )}
    </div>
  );
}

// Card Image Component
interface CardImageProps extends OptimizedImageProps {
  badge?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function CardImage({
  badge,
  badgePosition = 'top-right',
  containerClassName,
  ...props
}: CardImageProps) {
  const badgePositionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2'
  };

  return (
    <div className={cn('relative', containerClassName)}>
      <OptimizedImage
        aspectRatio="aspect-[4/3]"
        {...props}
      />
      {badge && (
        <div className={cn('absolute z-10', badgePositionClasses[badgePosition])}>
          {badge}
        </div>
      )}
    </div>
  );
}

// Gallery Image Component
interface GalleryImageProps extends OptimizedImageProps {
  lightbox?: boolean;
  onLightboxOpen?: () => void;
}

export function GalleryImage({
  lightbox = false,
  onLightboxOpen,
  className,
  ...props
}: GalleryImageProps) {
  const handleClick = () => {
    if (lightbox && onLightboxOpen) {
      onLightboxOpen();
    }
  };

  return (
    <OptimizedImage
      className={cn(
        lightbox && 'cursor-zoom-in hover:opacity-90 transition-opacity',
        className
      )}
      onClick={lightbox ? handleClick : undefined}
      {...props}
    />
  );
}

// Logo Image Component
interface LogoImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  variant?: 'light' | 'dark' | 'auto';
  height?: number;
}

export function LogoImage({
  variant = 'auto',
  height = 40,
  className,
  ...props
}: LogoImageProps) {
  return (
    <OptimizedImage
      aspectRatio=""
      containerClassName={cn('relative', `h-${height}`)}
      className={cn('object-contain', className)}
      priority
      quality={100}
      {...props}
    />
  );
}

// Product Image Component with zoom
interface ProductImageProps extends OptimizedImageProps {
  zoom?: boolean;
  zoomLevel?: number;
}

export function ProductImage({
  zoom = false,
  zoomLevel = 1.2,
  className,
  ...props
}: ProductImageProps) {
  return (
    <OptimizedImage
      className={cn(
        'transition-transform duration-300',
        zoom && `hover:scale-${Math.round(zoomLevel * 100)}`,
        className
      )}
      quality={95}
      {...props}
    />
  );
}

// Background Image Component
interface BackgroundImageProps extends OptimizedImageProps {
  children?: React.ReactNode;
  overlay?: boolean;
}

export function BackgroundImage({
  children,
  overlay = false,
  containerClassName,
  className,
  ...props
}: BackgroundImageProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <OptimizedImage
        className={cn('absolute inset-0 z-0', className)}
        aspectRatio=""
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      )}
      {children && (
        <div className="relative z-20">
          {children}
        </div>
      )}
    </div>
  );
}

export default OptimizedImage;

// Export hook for preloading images
export function useImagePreloader(urls: string[]) {
  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  };

  const preloadImages = async () => {
    try {
      await Promise.all(urls.map(preloadImage));
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    }
  };

  return { preloadImages };
} 