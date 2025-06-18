'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession } from '@/lib/useSession';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { signOut } from 'next-auth/react';
import {
  BarChart3,
  Settings,
  Users,
  FileText,
  Shield,
  Home,
  User,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  Mail,
  LogOut,
  ChevronRight,
  Zap,
  Target,
  Calendar,
  PenTool,
  Database,
  Activity
} from 'lucide-react';

interface SidebarItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: string[];
  badge?: string;
  isNew?: boolean;
  color?: string;
}

const sidebarItems: SidebarItem[] = [
  { 
    href: '/dashboard', 
    icon: Home, 
    label: 'Dashboard', 
    roles: ['USER', 'EDITOR', 'ADMIN'],
    color: 'text-blue-600'
  },
  { 
    href: '/dashboard/new-post', 
    icon: PenTool, 
    label: 'Create Post', 
    roles: ['EDITOR', 'ADMIN'],
    color: 'text-emerald-600'
  },
  { 
    href: '/dashboard/editor', 
    icon: FileText, 
    label: 'My Content', 
    roles: ['EDITOR', 'ADMIN'],
    badge: '12',
    color: 'text-purple-600'
  },
  { 
    href: '/dashboard/analytics', 
    icon: BarChart3, 
    label: 'Analytics', 
    roles: ['EDITOR', 'ADMIN'],
    color: 'text-orange-600'
  },
  { 
    href: '/dashboard/contact-submissions', 
    icon: Mail, 
    label: 'Messages', 
    roles: ['ADMIN'],
    badge: '3',
    color: 'text-indigo-600'
  },
  { 
    href: '/dashboard/admin', 
    icon: Shield, 
    label: 'Admin Panel', 
    roles: ['ADMIN'],
    isNew: true,
    color: 'text-red-600'
  },
  { 
    href: '/dashboard/admin/users', 
    icon: Users, 
    label: 'Users', 
    roles: ['ADMIN'],
    color: 'text-cyan-600'
  },
  { 
    href: '/dashboard/settings', 
    icon: Settings, 
    label: 'Settings', 
    roles: ['USER', 'EDITOR', 'ADMIN'],
    color: 'text-gray-600'
  },
];

interface ResponsiveSidebarProps {
  children: React.ReactNode;
}

export default function ResponsiveSidebar({ children }: ResponsiveSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session } = useSession();
  const pathname = usePathname();

  const userRole = session?.user?.role || 'USER';

  // Filter sidebar items based on user role
  const allowedItems = sidebarItems.filter(item =>
    item.roles.includes(userRole)
  );

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl lg:shadow-none flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Nexora</h1>
              <p className="text-xs text-gray-500">Digital Platform</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {session?.user?.name || 'Administrator'}
              </p>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={userRole === 'ADMIN' ? 'default' : 'secondary'} 
                  className="text-xs"
                >
                  {userRole}
                </Badge>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard/new-post">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </motion.button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
            {allowedItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition-all duration-200 relative group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-100'
                          : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : `bg-gray-100 ${item.color || 'text-gray-600'} group-hover:bg-gray-200`
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <span className="flex-1 font-medium">{item.label}</span>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge 
                            variant={isActive ? "default" : "secondary"} 
                            className="text-xs px-2 py-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {item.isNew && (
                          <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-green-500">
                            New
                          </Badge>
                        )}
                        {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 space-y-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <Bell className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left font-medium">Notifications</span>
            <Badge variant="destructive" className="text-xs">3</Badge>
          </motion.button>

          {/* Help & Support */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <Zap className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left font-medium">Help & Support</span>
          </motion.button>

          {/* Sign Out */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-700 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors"
          >
            <div className="p-2 rounded-lg bg-red-100 text-red-600">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left font-medium">Sign Out</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="hidden lg:flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 