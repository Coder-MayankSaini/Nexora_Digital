'use client';

import { useSession } from '@/lib/useSession';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationBell from '@/components/dashboard/NotificationBell';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  FileText,
  Eye,
  MessageSquare,
  Plus,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Zap
} from 'lucide-react';

// Simplified Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  gradient,
  delay = 0 
}: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay?: number;
}) => {
  const trendColors = {
    up: 'text-emerald-600 bg-emerald-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend]}`}>
              <TrendIcon className="h-3 w-3" />
              {change}
            </div>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Quick Action Button Component
const QuickActionButton = ({ 
  icon: Icon, 
  label, 
  description, 
  color,
  onClick 
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 group"
  >
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
          {label}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      </div>
      <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
    </div>
  </motion.button>
);

// Activity Item Component
const ActivityItem = ({ 
  icon: Icon, 
  title, 
  description, 
  time, 
  color 
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  time: string;
  color: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className={`p-1.5 rounded-lg ${color}`}>
      <Icon className="h-4 w-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 text-sm">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
    <span className="text-xs text-gray-400">{time}</span>
  </div>
);

export default function DashboardPage() {
  const { session } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { notifications, refreshNotifications } = useNotifications();

  // Fetch dashboard data
  const fetchDashboardStats = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/activity')
      ]);
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setDashboardStats(statsData);
      }
      
      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivities(activityData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchDashboardStats();
    
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Refresh dashboard data every 5 minutes
    const dataRefreshTimer = setInterval(fetchDashboardStats, 5 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(dataRefreshTimer);
    };
  }, []);

  // Use real data from API or fallback to loading/default values
  const stats = dashboardStats ? [
    {
      title: "Total Views",
      value: dashboardStats.totalViews.value.toLocaleString(),
      change: dashboardStats.totalViews.change,
      trend: dashboardStats.totalViews.trend as 'up' | 'down' | 'neutral',
      icon: Eye,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users",
      value: dashboardStats.activeUsers.value.toLocaleString(),
      change: dashboardStats.activeUsers.change,
      trend: dashboardStats.activeUsers.trend,
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Published Posts",
      value: dashboardStats.publishedPosts.toLocaleString(),
      change: "+23.1%",
      trend: "up",
      icon: FileText,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Engagement Rate",
      value: `${dashboardStats.engagement.value}%`,
      change: dashboardStats.engagement.change,
      trend: dashboardStats.engagement.trend,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600"
    }
  ] : [
    // Loading state - show placeholder values
    {
      title: "Total Views",
      value: loading ? "Loading..." : "0",
      change: "0%",
      trend: "neutral" as 'up' | 'down' | 'neutral',
      icon: Eye,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users", 
      value: loading ? "Loading..." : "0",
      change: "0%",
      trend: "neutral" as 'up' | 'down' | 'neutral',
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Published Posts",
      value: loading ? "Loading..." : "0",
      change: "0%", 
      trend: "neutral" as 'up' | 'down' | 'neutral',
      icon: FileText,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Engagement Rate",
      value: loading ? "Loading..." : "0%",
      change: "0%",
      trend: "neutral" as 'up' | 'down' | 'neutral', 
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      label: "Create New Post",
      description: "Start writing your next article",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      onClick: () => window.location.href = '/dashboard/new-post'
    },
    {
      icon: FileText,
      label: "Manage Posts",
      description: "View and edit existing content",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      onClick: () => window.location.href = '/dashboard/editor'
    },
    {
      icon: MessageSquare,
      label: "Contact Submissions", 
      description: `Review customer inquiries ${notifications?.newContactSubmissions ? `(${notifications.newContactSubmissions} new)` : ''}`,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      onClick: () => window.location.href = '/dashboard/contact-submissions'
    },
    {
      icon: Users,
      label: "Admin Panel",
      description: "System administration tools",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      onClick: () => window.location.href = '/dashboard/admin'
    }
  ];

  // Fallback activity for empty state
  const fallbackActivities = [
    {
      icon: FileText,
      title: "Welcome to Dashboard",
      description: "Your activity feed will appear here once you start creating content",
      time: "now",
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white"
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  Admin Dashboard
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-300/30">
                  Live
                </Badge>
              </div>
              <h1 className="text-4xl font-bold">
                Welcome back, {session?.user?.name || 'Admin'}! 👋
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl">
                Here's what's happening with your platform today. Monitor your content performance and engage with your audience.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <div className="text-right">
                <p className="text-blue-100 text-sm">Current Time</p>
                <p className="text-xl font-semibold">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-blue-200 text-sm">
                  {currentTime.toLocaleDateString([], { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <NotificationBell notifications={notifications} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36" />
      </motion.div>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-gray-600 mt-1">Track your key metrics and growth</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={fetchDashboardStats}
              disabled={loading}
            >
              <Activity className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={async () => {
                try {
                  const response = await fetch('/api/dashboard/seed', { method: 'POST' });
                  if (response.ok) {
                    await fetchDashboardStats(); // Refresh data
                    alert('Sample data created successfully!');
                  }
                } catch (error) {
                  alert('Failed to create sample data');
                }
              }}
            >
              <Plus className="h-4 w-4" />
              Add Sample Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat: any, index: number) => (
            <StatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Contact Submissions Summary */}
        {notifications && notifications.newContactSubmissions > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <Card 
              className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/dashboard/contact-submissions'}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-blue-900">New Contact Submissions</CardTitle>
                      <CardDescription className="text-blue-700">
                        {notifications.newContactSubmissions} unread inquiries awaiting response
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-500 text-white text-lg px-3 py-1">
                    {notifications.newContactSubmissions}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700">
                    {notifications.recentContacts} total submissions this week
                  </p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                    View All Submissions →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used tools and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <QuickActionButton
                  key={action.label}
                  {...action}
                />
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest updates and notifications
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Show contact notifications first if any */}
                {notifications?.latestSubmissions?.map((submission: any, index: number) => (
                  <div
                    key={`notification-${index}`}
                    className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
                    onClick={() => window.location.href = '/dashboard/contact-submissions'}
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-blue-900 text-sm">{submission.title}</p>
                        <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">{submission.description}</p>
                      <p className="text-xs text-blue-600 mt-1">Services: {submission.services.join(', ')}</p>
                    </div>
                    <span className="text-xs text-blue-600">{submission.time}</span>
                  </div>
                ))}
                
                {/* Regular activities */}
                {(recentActivities.length > 0 ? recentActivities : fallbackActivities).map((activity, index) => {
                  // Map icon strings to actual components
                  const iconMap: { [key: string]: any } = {
                    FileText,
                    MessageSquare,
                    Users
                  };
                  const IconComponent = iconMap[activity.icon] || FileText;
                  
                  return (
                    <ActivityItem
                      key={index}
                      icon={IconComponent}
                      title={activity.title}
                      description={activity.description}
                      time={activity.time}
                      color={activity.color}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}