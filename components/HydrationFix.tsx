'use client';

import { useEffect, useState } from 'react';

/**
 * A component that helps prevent hydration errors by ensuring
 * the component only renders after hydration is complete.
 */
export default function HydrationFix() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return null;
} 