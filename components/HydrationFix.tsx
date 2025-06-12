'use client';

import { useEffect } from 'react';

/**
 * This component fixes hydration errors related to class and attribute mismatches
 * by ensuring they are only handled on the client side
 */
export default function HydrationFix() {
  useEffect(() => {
    // Remove the 'hydrated' class if it exists
    if (document.documentElement.classList.contains('hydrated')) {
      document.documentElement.classList.remove('hydrated');
    }
    
    // Remove the 'cz-shortcut-listen' attribute if it exists
    if (document.body.hasAttribute('cz-shortcut-listen')) {
      document.body.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  // This component doesn't render anything
  return null;
} 