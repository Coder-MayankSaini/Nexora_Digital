'use client';

import { useSession } from '@/lib/useSession';
import { 
  DynamicStatsOverview,
  DynamicContentPreviewTable,
  DynamicQuickAccessPanel,
  LazyWrapper 
} from '@/components/dynamic/DynamicDashboardComponents';
import { 
  StatsCardSkeleton,
  TableSkeleton,
  DashboardSkeleton 
} from '@/components/ui/loading-skeleton';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { measurePagePerformance, type PerformanceMetrics } from '@/lib/performance';

export default function DashboardPage() {
  const { session } = useSession();
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // Measure page performance
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const metrics = measurePagePerformance();
        setPerformanceMetrics(metrics);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const userRole = session?.user?.role;

  return (
    <div className="space-y-8">
      {/* Page Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Here's what's happening with your content today.
            </p>
          </div>
          
          {/* Performance Badge (Development Only) */}
          {process.env.NODE_ENV === 'development' && performanceMetrics && (
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Load: {performanceMetrics.loadTime.toFixed(0)}ms
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Overview - Dynamically Imported */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Performance Overview
        </h2>
        <LazyWrapper 
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <StatsCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <DynamicStatsOverview />
        </LazyWrapper>
      </motion.section>

      {/* Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Preview Table */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Content
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Your latest posts and their performance metrics
              </p>
            </div>
            <div className="p-6">
              <LazyWrapper
                fallback={<TableSkeleton rows={8} columns={5} />}
              >
                <DynamicContentPreviewTable />
              </LazyWrapper>
            </div>
          </div>
        </motion.section>

        {/* Quick Access Panel */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <LazyWrapper
                fallback={
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                }
              >
                <DynamicQuickAccessPanel />
              </LazyWrapper>
            </div>
          </div>

          {/* Role-specific Features */}
          {(userRole === 'ADMIN' || userRole === 'EDITOR') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-sm text-white p-6"
            >
              <h3 className="text-lg font-semibold mb-2">
                {userRole === 'ADMIN' ? 'Admin Tools' : 'Editor Tools'}
              </h3>
              <p className="text-purple-100 mb-4 text-sm">
                Access advanced features and management tools
              </p>
              <div className="space-y-2">
                {userRole === 'ADMIN' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                  >
                    User Management
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  Analytics Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  Content Management
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Tips & Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-blue-50 rounded-lg p-6 border border-blue-200"
          >
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              Use keyboard shortcuts to navigate faster through your dashboard.
            </p>
            <div className="space-y-1 text-xs text-blue-700">
              <div className="flex justify-between">
                <span>New Post:</span>
                <kbd className="px-2 py-1 bg-white rounded shadow text-xs">Ctrl + N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Search:</span>
                <kbd className="px-2 py-1 bg-white rounded shadow text-xs">Ctrl + K</kbd>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Activity Feed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-lg border shadow-sm"
      >
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Latest updates and notifications from your team
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Published', item: 'Getting Started with Next.js', time: '2 hours ago', user: 'John Doe' },
              { action: 'Updated', item: 'Dashboard Performance Guide', time: '4 hours ago', user: 'Jane Smith' },
              { action: 'Created', item: 'Weekly Newsletter Draft', time: '6 hours ago', user: 'Mike Johnson' },
              { action: 'Commented on', item: 'React Best Practices', time: '8 hours ago', user: 'Sarah Wilson' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action.toLowerCase()}{' '}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
} 