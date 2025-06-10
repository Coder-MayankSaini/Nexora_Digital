// Performance monitoring and optimization utilities
import React from 'react';

// Performance Metrics
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

// Measure page load performance
export function measurePagePerformance(): PerformanceMetrics {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
  const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
  
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime;
  
  return {
    loadTime,
    renderTime,
    firstContentfulPaint: fcp,
  };
}

// Monitor Core Web Vitals
export function monitorWebVitals(callback: (metric: any) => void) {
  if (typeof window === 'undefined') return;

  // LCP - Largest Contentful Paint
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      callback({
        name: 'LCP',
        value: lastEntry.startTime,
        delta: lastEntry.startTime,
      });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // FID - First Input Delay
  const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime;
        callback({
          name: 'FID',
          value: fid,
          delta: fid,
        });
      }
    });
    observer.observe({ entryTypes: ['first-input'] });
  };

  // CLS - Cumulative Layout Shift
  const observeCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      callback({
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
      });
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  // Execute observers
  observeLCP();
  observeFID();
  observeCLS();
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image sizes
  generateSizes: (breakpoints: { [key: string]: number }) => {
    return Object.entries(breakpoints)
      .map(([size, width]) => `(max-width: ${width}px) 100vw`)
      .join(', ') + ', 100vw';
  },

  // Generate blur data URL
  generateBlurDataURL: (width = 8, height = 8, color = '#f3f4f6') => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${color}"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  },

  // Preload critical images
  preloadImages: async (urls: string[]) => {
    const promises = urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    });
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }
};

// Bundle size optimization
export const bundleOptimization = {
  // Dynamic import with error handling
  dynamicImport: async <T>(
    importFunc: () => Promise<T>,
    fallback?: T
  ): Promise<T> => {
    try {
      return await importFunc();
    } catch (error) {
      console.error('Dynamic import failed:', error);
      if (fallback) return fallback;
      throw error;
    }
  },

  // Check if module should be loaded
  shouldLoadModule: (condition: boolean, moduleLoader: () => Promise<any>) => {
    if (condition) {
      return moduleLoader();
    }
    return Promise.resolve(null);
  }
};

// Memory management
export const memoryOptimization = {
  // Cleanup event listeners
  createCleanupManager: () => {
    const cleanupFunctions: (() => void)[] = [];
    
    return {
      add: (cleanup: () => void) => {
        cleanupFunctions.push(cleanup);
      },
      cleanup: () => {
        cleanupFunctions.forEach(fn => fn());
        cleanupFunctions.length = 0;
      }
    };
  },

  // Debounce function calls
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function calls
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Performance budget checking
export interface PerformanceBudget {
  maxBundleSize: number; // in KB
  maxImageSize: number;  // in KB
  maxLoadTime: number;   // in ms
  maxLCP: number;        // in ms
  maxFID: number;        // in ms
  maxCLS: number;        // score
}

export function checkPerformanceBudget(
  metrics: PerformanceMetrics,
  budget: PerformanceBudget
): { passed: boolean; violations: string[] } {
  const violations: string[] = [];

  if (metrics.loadTime > budget.maxLoadTime) {
    violations.push(`Load time (${metrics.loadTime}ms) exceeds budget (${budget.maxLoadTime}ms)`);
  }

  if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > budget.maxLCP) {
    violations.push(`LCP (${metrics.largestContentfulPaint}ms) exceeds budget (${budget.maxLCP}ms)`);
  }

  if (metrics.firstInputDelay && metrics.firstInputDelay > budget.maxFID) {
    violations.push(`FID (${metrics.firstInputDelay}ms) exceeds budget (${budget.maxFID}ms)`);
  }

  if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > budget.maxCLS) {
    violations.push(`CLS (${metrics.cumulativeLayoutShift}) exceeds budget (${budget.maxCLS})`);
  }

  return {
    passed: violations.length === 0,
    violations
  };
}

// Resource hints
export const resourceHints = {
  // Preload critical resources
  preload: (href: string, as: string, type?: string) => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  // Prefetch likely resources
  prefetch: (href: string) => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // DNS prefetch for external domains
  dnsPrefetch: (domain: string) => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  },

  // Preconnect to critical domains
  preconnect: (domain: string) => {
    if (typeof document === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  }
};

// Performance observer wrapper
export function createPerformanceObserver(
  entryTypes: string[],
  callback: (entries: PerformanceEntry[]) => void
) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return null;
  }

  const observer = new PerformanceObserver((list) => {
    callback(list.getEntries());
  });

  try {
    observer.observe({ entryTypes });
    return observer;
  } catch (error) {
    console.warn('Performance observer failed:', error);
    return null;
  }
}

// React-specific optimizations
export const reactOptimizations = {
  // Memoize expensive calculations
  useMemoizedValue: <T>(factory: () => T, deps: React.DependencyList): T => {
    return React.useMemo(factory, deps);
  },

  // Memoize callbacks
  useMemoizedCallback: <T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
  ): T => {
    return React.useCallback(callback, deps);
  },

  // Virtual scrolling helper
  useVirtualScrolling: (
    items: any[],
    itemHeight: number,
    containerHeight: number
  ) => {
    const [scrollTop, setScrollTop] = React.useState(0);
    
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );
    
    const visibleItems = items.slice(startIndex, endIndex + 1);
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    
    return {
      visibleItems,
      totalHeight,
      offsetY,
      setScrollTop
    };
  }
};

export default {
  measurePagePerformance,
  monitorWebVitals,
  imageOptimization,
  bundleOptimization,
  memoryOptimization,
  checkPerformanceBudget,
  resourceHints,
  createPerformanceObserver,
  reactOptimizations
}; 