'use client';

import { useEffect } from 'react';

/**
 * This component fixes hydration errors related to the 'hydrated' class
 * by ensuring the class is only added/removed on the client side
 */
export default function HydrationFix() {
  useEffect(() => {
    // Remove the 'hydrated' class if it exists
    if (document.documentElement.classList.contains('hydrated')) {
      document.documentElement.classList.remove('hydrated');
    }
  }, []);

  // This component doesn't render anything
  return null;
} 