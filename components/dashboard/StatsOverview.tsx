'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  Heart,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient: string;
  index: number;
  extraInfo?: string;
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  gradient, 
  index,
  extraInfo 
}: StatCardProps) => {
  const TrendIcon = trend?.isPositive ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend?.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-gray-600 tracking-wide">
              {title}
            </CardTitle>
            {extraInfo && (
              <p className="text-xs text-gray-500">{extraInfo}</p>
            )}
          </div>
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10">
          <div className="text-3xl font-bold text-gray-900">
            {value}
          </div>
          
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-gray-600">
              {description}
            </CardDescription>
            {trend && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${trendColor}`}>
                <TrendIcon className="h-3 w-3" />
                {trend.value}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StatsOverviewProps {
  stats?: {
    totalUsers?: number;
    publishedPosts?: number;
    draftPosts?: number;
    totalContacts?: number;
    totalViews?: number;
    engagement?: number;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const defaultStats = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      description: 'Registered users',
      extraInfo: 'Active users',
      icon: Users,
      trend: { value: '12.5%', isPositive: true },
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Published Posts',
      value: stats?.publishedPosts || 0,
      description: 'Articles & posts',
      extraInfo: 'Published content',
      icon: FileText,
      trend: { value: '8.2%', isPositive: true },
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Contact Submissions',
      value: stats?.totalContacts || 0,
      description: 'Customer inquiries',
      extraInfo: 'Total submissions',
      icon: MessageSquare,
      trend: { value: '18.7%', isPositive: true },
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Page Views',
      value: stats?.totalViews || 0,
      description: 'Total page views',
      extraInfo: 'Site traffic',
      icon: Eye,
      trend: { value: '23.1%', isPositive: true },
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Statistics Overview</h2>
        <p className="text-gray-600">Key metrics and performance indicators</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {defaultStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
} 