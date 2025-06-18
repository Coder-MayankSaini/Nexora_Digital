'use client';

import { useSession } from '@/lib/useSession';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { measurePagePerformance, type PerformanceMetrics } from '@/lib/performance';
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
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Eye,
  MessageSquare,
  Calendar,
  Clock,
  Activity,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Share2,
  Target,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react';

// Enhanced Stats Card Component
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50">
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

// Recent Activity Item Component
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
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Measure page performance
    const perfTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const metrics = measurePagePerformance();
        setPerformanceMetrics(metrics);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(perfTimer);
    };
  }, []);

  const stats = [
    {
      title: "Total Views",
      value: "124.5K",
      change: "+12.5%",
      trend: "up" as const,
      icon: Eye,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users",
      value: "3,247",
      change: "+8.2%",
      trend: "up" as const,
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Published Posts",
      value: "156",
      change: "+23.1%",
      trend: "up" as const,
      icon: FileText,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Engagement Rate",
      value: "94.3%",
      change: "+5.7%",
      trend: "up" as const,
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
      icon: BarChart3,
      label: "View Analytics",
      description: "Check detailed performance metrics",
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      onClick: () => {}
    },
    {
      icon: Settings,
      label: "Manage Settings",
      description: "Configure your preferences",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      onClick: () => {}
    },
    {
      icon: Users,
      label: "Team Management",
      description: "Manage users and permissions",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      onClick: () => {}
    }
  ];

  const recentActivities = [
    {
      icon: FileText,
      title: "New post published",
      description: "Advanced React Patterns published successfully",
      time: "2h ago",
      color: "bg-blue-500"
    },
    {
      icon: MessageSquare,
      title: "New comment received",
      description: "Someone commented on your latest post",
      time: "4h ago",
      color: "bg-emerald-500"
    },
    {
      icon: Users,
      title: "New user registered",
      description: "John Doe joined your platform",
      time: "6h ago",
      color: "bg-purple-500"
    },
    {
      icon: Star,
      title: "Post featured",
      description: "Your post was featured on the homepage",
      time: "1d ago",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
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
              
              {performanceMetrics && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">
                    Load time: {performanceMetrics.loadTime.toFixed(0)}ms
                  </span>
                </div>
              )}
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
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>
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

        {/* Recent Activity & Analytics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Recent Activity */}
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
                {recentActivities.map((activity, index) => (
                  <ActivityItem
                    key={index}
                    {...activity}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Stats */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Platform Insights
              </CardTitle>
              <CardDescription>
                Audience and device analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Desktop</span>
                    </div>
                    <span className="text-sm font-semibold">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium">Mobile</span>
                    </div>
                    <span className="text-sm font-semibold">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}