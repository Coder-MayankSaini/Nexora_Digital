'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, useRequiredRole } from '@/lib/useSession';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Plus
} from 'lucide-react';

interface SidebarItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  roles: string[];
  badge?: string;
  isNew?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { 
    href: '/dashboard', 
    icon: Home, 
    label: 'Overview', 
    roles: ['USER', 'EDITOR', 'ADMIN'] 
  },
  { 
    href: '/dashboard/profile', 
    icon: User, 
    label: 'Profile', 
    roles: ['USER', 'EDITOR', 'ADMIN'] 
  },
  { 
    href: '/dashboard/editor', 
    icon: FileText, 
    label: 'Content', 
    roles: ['EDITOR', 'ADMIN'],
    badge: '12'
  },
  { 
    href: '/dashboard/analytics', 
    icon: BarChart3, 
    label: 'Analytics', 
    roles: ['EDITOR', 'ADMIN'] 
  },
  { 
    href: '/dashboard/admin', 
    icon: Shield, 
    label: 'Admin Panel', 
    roles: ['ADMIN'],
    isNew: true
  },
  { 
    href: '/dashboard/admin/users', 
    icon: Users, 
    label: 'User Management', 
    roles: ['ADMIN'] 
  },
  { 
    href: '/dashboard/settings', 
    icon: Settings, 
    label: 'Settings', 
    roles: ['USER', 'EDITOR', 'ADMIN'] 
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

  return (
    <div className="flex h-screen bg-background">
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
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-lg lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b">
            <Button className="w-full justify-start gap-2" size="sm">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {allowedItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative group ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-1">
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                            {item.badge}
                          </Badge>
                        )}
                        {item.isNew && (
                          <Badge className="text-xs px-1.5 py-0.5 bg-green-500">
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session?.user?.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole.toLowerCase()}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b bg-background">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 