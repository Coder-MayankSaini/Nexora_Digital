'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider
      // Add error handling and refetch configuration
      refetchInterval={5 * 60} // Refetch every 5 minutes
      refetchOnWindowFocus={false} // Don't refetch on window focus to reduce load
    >
      {children}
    </NextAuthSessionProvider>
  );
} 