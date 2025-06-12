'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';

// Dynamically import the login content with SSR disabled to prevent hydration errors
const LoginContent = dynamic(
  () => import('@/components/login/LoginContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
      </div>
    )
  }
);

export default function LoginPage() {
  // Use state to control rendering to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Header />
      {isMounted ? (
        <LoginContent />
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
      )}
    </>
  );
}
