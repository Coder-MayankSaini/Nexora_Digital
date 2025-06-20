import { useState, useEffect } from 'react';

interface NotificationData {
  newContactSubmissions: number;
  draftPosts: number;
  recentContacts: number;
  latestSubmissions: any[];
  totalNotifications: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationData | null>(null);
  
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/dashboard/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    refreshNotifications: fetchNotifications
  };
} 