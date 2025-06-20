'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NotificationBellProps {
  notifications: {
    newContactSubmissions: number;
    draftPosts: number;
    recentContacts: number;
    latestSubmissions: Array<{
      id: string;
      title: string;
      description: string;
      time: string;
      type: string;
      services: string[];
    }>;
    totalNotifications: number;
  } | null;
  variant?: 'sidebar' | 'header';
}

export default function NotificationBell({ notifications, variant = 'sidebar' }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!notifications || notifications.totalNotifications === 0) {
    return null;
  }

  const isHeader = variant === 'header';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative ${isHeader 
            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg' 
            : 'w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl'
          }`}
        >
          {isHeader ? (
            <Bell className="h-5 w-5" />
          ) : (
            <>
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Bell className="h-4 w-4" />
              </div>
              <span className="flex-1 text-left font-medium">Notifications</span>
            </>
          )}
          
          {isHeader ? (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          ) : (
            <Badge variant="destructive" className="text-xs">
              {notifications.totalNotifications}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0 border-0 shadow-xl"
        align="end"
        sideOffset={8}
      >
        <Card className="border-0">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Notifications
              <Badge className="bg-blue-100 text-blue-700">
                {notifications.totalNotifications}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 max-h-96 overflow-y-auto">
            <div className="space-y-1">
              {/* Contact Submissions */}
              {notifications.latestSubmissions?.map((submission, index) => (
                <div
                  key={submission.id}
                  className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => {
                    window.location.href = '/dashboard/contact-submissions';
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {submission.title}
                        </p>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          NEW
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {submission.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {submission.time}
                          </span>
                        </div>
                        {submission.services.length > 0 && (
                          <div className="text-xs text-blue-600">
                            {submission.services.slice(0, 2).join(', ')}
                            {submission.services.length > 2 && ' +more'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Summary Actions */}
              <div className="p-4 bg-gray-50 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    window.location.href = '/dashboard/contact-submissions';
                    setIsOpen(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Contact Submissions
                  {notifications.newContactSubmissions > 0 && (
                    <Badge className="ml-auto bg-blue-500 text-white">
                      {notifications.newContactSubmissions}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
} 