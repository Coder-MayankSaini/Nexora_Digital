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
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Globe
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-white to-gray-50/30">
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-3 group-hover:opacity-8 transition-opacity duration-500`} />
        
        {/* Animated background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <Icon className="w-full h-full" />
        </div>
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-gray-600 tracking-wide">
              {title}
            </CardTitle>
            {extraInfo && (
              <p className="text-xs text-gray-500">{extraInfo}</p>
            )}
          </div>
          <motion.div 
            className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-xl`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10">
          <motion.div 
            className="text-3xl font-bold text-gray-900"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
          >
            {value}
          </motion.div>
          
          <div className="flex items-center justify-between">
            <CardDescription className="text-sm font-medium text-gray-600">
              {description}
            </CardDescription>
            {trend && (
              <motion.div 
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${trendColor}`}
                whileHover={{ scale: 1.1 }}
              >
                <TrendIcon className="h-3 w-3" />
                {trend.value}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Quick Stats Summary Component
const QuickStatsSummary = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
  >
    {[
      { label: "Total Revenue", value: "$52,847", trend: "+18.2%" },
      { label: "Conversion Rate", value: "3.24%", trend: "+0.4%" },
      { label: "Avg. Session", value: "4m 32s", trend: "+12.5%" },
      { label: "Bounce Rate", value: "24.8%", trend: "-5.3%" }
    ].map((stat, index) => (
      <div 
        key={stat.label}
        className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors"
      >
        <p className="text-xs text-gray-500 font-medium mb-1">{stat.label}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{stat.value}</span>
          <Badge variant="secondary" className="text-xs">
            {stat.trend}
          </Badge>
        </div>
      </div>
    ))}
  </motion.div>
);

export default function StatsOverview() {
  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      description: 'Registered users',
      extraInfo: '+247 this week',
      icon: Users,
      trend: { value: '12.5%', isPositive: true },
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Content Published',
      value: '1,567',
      description: 'Articles & posts',
      extraInfo: '23 published today',
      icon: FileText,
      trend: { value: '8.2%', isPositive: true },
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Engagement',
      value: '89.3%',
      description: 'User engagement rate',
      extraInfo: 'Above industry avg',
      icon: Heart,
      trend: { value: '15.3%', isPositive: true },
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Page Views',
      value: '2.4M',
      description: 'Monthly page views',
      extraInfo: '156K this week',
      icon: Eye,
      trend: { value: '23.1%', isPositive: true },
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Comments',
      value: '45,892',
      description: 'Total comments',
      extraInfo: '1,247 new today',
      icon: MessageSquare,
      trend: { value: '18.7%', isPositive: true },
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Social Shares',
      value: '18,294',
      description: 'Content shared',
      extraInfo: 'Trending up',
      icon: Share2,
      trend: { value: '27.4%', isPositive: true },
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Growth Rate',
      value: '+34.7%',
      description: 'Monthly growth',
      extraInfo: 'All-time high',
      icon: TrendingUp,
      trend: { value: '4.2%', isPositive: true },
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Global Reach',
      value: '127',
      description: 'Countries reached',
      extraInfo: '+5 new markets',
      icon: Globe,
      trend: { value: '9.1%', isPositive: true },
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
          <Target className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">Platform Analytics</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Performance Dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive overview of your platform's key performance indicators and growth metrics across all channels.
        </p>
      </motion.div>

      {/* Quick Stats Summary */}
      <QuickStatsSummary />

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            {...stat}
            index={index}
          />
        ))}
      </div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Performance Score */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-600" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-emerald-600">94</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Health</span>
                  <span className="font-medium">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Next.js Best Practices", views: "15.2K" },
                { title: "React Performance Tips", views: "12.8K" },
                { title: "Modern CSS Techniques", views: "9.4K" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.views}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "🎉 Reached 10K users milestone",
                "📈 Hit 1M monthly page views",
                "🌟 Featured in tech newsletter"
              ].map((achievement, index) => (
                <div key={index} className="text-sm text-gray-700">
                  {achievement}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 