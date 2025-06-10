'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  Heart,
  Share2,
  Calendar
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
  color: string;
  index: number;
}

const StatCard = ({ title, value, description, icon: Icon, trend, color, index }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <div className="flex items-center justify-between">
            <CardDescription className="text-xs">
              {description}
            </CardDescription>
            {trend && (
              <span className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
            )}
          </div>
        </CardContent>
        
        {/* Animated background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <Icon className="w-full h-full" />
        </div>
      </Card>
    </motion.div>
  );
};

export default function StatsOverview() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      description: 'Active users this month',
      icon: Users,
      trend: { value: '12.5%', isPositive: true },
      color: 'bg-blue-500'
    },
    {
      title: 'Posts Published',
      value: '156',
      description: 'Content published',
      icon: FileText,
      trend: { value: '8.2%', isPositive: true },
      color: 'bg-green-500'
    },
    {
      title: 'Comments',
      value: '1,234',
      description: 'User engagement',
      icon: MessageSquare,
      trend: { value: '15.3%', isPositive: true },
      color: 'bg-purple-500'
    },
    {
      title: 'Page Views',
      value: '45.2K',
      description: 'Monthly page views',
      icon: Eye,
      trend: { value: '23.1%', isPositive: true },
      color: 'bg-orange-500'
    },
    {
      title: 'Likes',
      value: '8,954',
      description: 'Total likes received',
      icon: Heart,
      trend: { value: '5.4%', isPositive: true },
      color: 'bg-red-500'
    },
    {
      title: 'Shares',
      value: '2,847',
      description: 'Content shared',
      icon: Share2,
      trend: { value: '18.7%', isPositive: true },
      color: 'bg-indigo-500'
    },
    {
      title: 'Growth Rate',
      value: '94.3%',
      description: 'Monthly growth',
      icon: TrendingUp,
      trend: { value: '2.1%', isPositive: true },
      color: 'bg-emerald-500'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      description: 'Average session time',
      icon: Calendar,
      trend: { value: '7.8%', isPositive: true },
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-muted-foreground">
          Here's a summary of your platform's performance this month.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            index={index}
          />
        ))}
      </div>
    </div>
  );
} 