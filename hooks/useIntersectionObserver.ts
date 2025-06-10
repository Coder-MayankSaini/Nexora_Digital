'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<Element | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  triggerOnce = true,
  skip = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const ref = useRef<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element || skip) {
      return;
    }

    // If triggerOnce is true and has already triggered, don't observe
    if (triggerOnce && hasTriggered) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          setHasTriggered(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, triggerOnce, skip, hasTriggered]);

  return { ref, isIntersecting, entry };
}

// Multiple elements observer
export function useMultipleIntersectionObserver(
  elementsCount: number,
  options: UseIntersectionObserverOptions = {}
) {
  const refs = useRef<(Element | null)[]>(new Array(elementsCount).fill(null));
  const [intersections, setIntersections] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  );

  useEffect(() => {
    const currentRefs = refs.current.filter(Boolean);
    
    if (currentRefs.length === 0 || options.skip) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = currentRefs.indexOf(entry.target);
          if (index !== -1) {
            setIntersections(prev => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });

            if (entry.isIntersecting && options.triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
      }
    );

    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [elementsCount, options.threshold, options.root, options.rootMargin, options.triggerOnce, options.skip]);

  const setRef = (index: number) => (element: Element | null) => {
    refs.current[index] = element;
  };

  return { setRef, intersections };
} 