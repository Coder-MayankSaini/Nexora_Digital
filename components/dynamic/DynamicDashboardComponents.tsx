'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { 
  StatsCardSkeleton, 
  TableSkeleton, 
  SidebarSkeleton, 
  PostEditorSkeleton,
  DashboardSkeleton 
} from '@/components/ui/loading-skeleton';

// Dashboard Overview Components with Loading States
export const DynamicStatsOverview = dynamic(
  () => import('@/components/dashboard/StatsOverview'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
    ),
    ssr: false
  }
);

export const DynamicContentPreviewTable = dynamic(
  () => import('@/components/dashboard/ContentPreviewTable'),
  {
    loading: () => <TableSkeleton rows={10} columns={6} />,
    ssr: false
  }
);

export const DynamicQuickAccessPanel = dynamic(
  () => import('@/components/dashboard/QuickAccessPanel'),
  {
    loading: () => (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white border rounded-lg p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    ),
    ssr: false
  }
);

export const DynamicResponsiveSidebar = dynamic(
  () => import('@/components/dashboard/ResponsiveSidebar'),
  {
    loading: () => <SidebarSkeleton />,
    ssr: false
  }
);

// Editor Components
export const DynamicRichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  {
    loading: () => (
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex space-x-2 pb-2 border-b">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ),
    ssr: false
  }
);

export const DynamicFeaturedImageUpload = dynamic(
  () => import('@/components/editor/FeaturedImageUpload'),
  {
    loading: () => (
      <div className="space-y-3">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-48 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>
    ),
    ssr: false
  }
);

export const DynamicSEOMetaFields = dynamic(
  () => import('@/components/editor/SEOMetaFields'),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ),
    ssr: false
  }
);

// Animation Components (for pages that use them)
export const DynamicScrollReveal = dynamic(
  () => import('@/components/animations/ScrollReveal').then(mod => ({ default: mod.default })),
  {
    loading: () => <div className="opacity-0">Loading...</div>,
    ssr: false
  }
);

export const DynamicStaggerReveal = dynamic(
  () => import('@/components/animations/StaggerReveal').then(mod => ({ default: mod.default })),
  {
    loading: () => <div className="opacity-0">Loading...</div>,
    ssr: false
  }
);

export const DynamicScrollParallax = dynamic(
  () => import('@/components/animations/ScrollParallax').then(mod => ({ default: mod.default })),
  {
    loading: () => <div className="opacity-0">Loading...</div>,
    ssr: false
  }
);

// Higher-order component for dashboard pages
export function withDashboardSuspense<T extends object>(
  Component: React.ComponentType<T>,
  LoadingSkeleton: React.ComponentType = DashboardSkeleton
) {
  return function WrappedComponent(props: T) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Pre-configured dashboard page components
export const DynamicDashboardPage = dynamic(
  () => import('@/app/dashboard/page'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicEditorPage = dynamic(
  () => import('@/app/dashboard/editor/page'),
  {
    loading: () => <PostEditorSkeleton />,
    ssr: false
  }
);

export const DynamicAdminPage = dynamic(
  () => import('@/app/dashboard/admin/page'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

// Wrapper component for lazy loading with error boundary
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export function LazyWrapper({ 
  children, 
  fallback = <DashboardSkeleton />,
  errorFallback = (
    <div className="p-6 text-center">
      <p className="text-gray-500">Something went wrong. Please try again.</p>
    </div>
  )
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
} 