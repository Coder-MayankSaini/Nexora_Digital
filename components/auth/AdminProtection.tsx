'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Shield, Loader2 } from 'lucide-react';

interface AdminProtectionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AdminProtection({ children, fallback }: AdminProtectionProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // No session, redirect to admin login
      router.push('/admin-login');
      return;
    }

    // Check if user has admin role
    if (session.user?.role !== 'ADMIN') {
      // Not an admin, redirect to unauthorized page
      router.push('/dashboard/unauthorized');
      return;
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if no session
  if (!session) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (session.user?.role !== 'ADMIN') {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Insufficient Privileges</h1>
          <p className="text-gray-600">Admin access required. Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and is admin, render children
  return <>{children}</>;
} 