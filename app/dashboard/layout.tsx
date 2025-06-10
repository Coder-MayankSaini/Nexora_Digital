'use client';

import { useSession, useRequiredRole } from '@/lib/useSession';
import SessionProvider from '@/components/auth/SessionProvider';
import ResponsiveSidebar from '@/components/dashboard/ResponsiveSidebar';
import { Suspense, useEffect } from 'react';
import { DashboardSkeleton, SidebarSkeleton } from '@/components/ui/loading-skeleton';
import { monitorWebVitals, resourceHints } from '@/lib/performance';

// Enhanced loading component with better skeletons
function DashboardLoading() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSkeleton />
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right space-y-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <DashboardSkeleton />
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession();

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor Web Vitals
      monitorWebVitals((metric) => {
        console.log('Web Vital:', metric);
        // Send to analytics service in production
      });

      // Preconnect to critical domains
      resourceHints.preconnect('https://images.unsplash.com');
      resourceHints.preconnect('https://api.cloudinary.com');
      
      // DNS prefetch for likely resources
      resourceHints.dnsPrefetch('https://fonts.googleapis.com');
    }
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return <DashboardLoading />;
  }

  // If no session, the middleware will redirect to login
  if (!session) {
    return null;
  }

  return (
    <ResponsiveSidebar>
      <Suspense fallback={
        <div className="p-6">
          <DashboardSkeleton />
        </div>
      }>
        <div className="p-6">
          {children}
        </div>
      </Suspense>
    </ResponsiveSidebar>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent>{children}</DashboardContent>
      </Suspense>
    </SessionProvider>
  );
} 