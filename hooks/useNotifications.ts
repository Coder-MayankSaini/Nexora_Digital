import { useState, useEffect, useRef } from 'react';

interface NotificationData {
  newContactSubmissions: number;
  draftPosts: number;
  recentContacts: number;
  latestSubmissions: any[];
  totalNotifications: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationData | null>(null);
  const [previousCount, setPreviousCount] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio for notifications
  useEffect(() => {
    // Create a notification sound (simple beep using Web Audio API)
    audioRef.current = new Audio();
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaHjoHt+/0uGsrBFu82/OfWRwIQp3e9LZuHgU7k9n1x3oqBjJz0fHCbyMFonrEOOCUQwsNV7Lq46JQEwxDmN+nNgpE84y0vJ9IEApJq+LysVALClOYx/K3YxsDaO2eeiYJtb5r7/xsawswBxYAQDQAww9kTQfQ7BtX3YGmBxdYfA+8DbG0XS+qd1G3FrSyOzCIDVJgJTdgfOQQMnEjEA1xJAgNYjLHTbAbTTYj+gePpNIe7xpNx5ykl35LhW9XQG5eBe8=';
    audioRef.current.preload = 'auto';
    audioRef.current.volume = 0.3;
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/dashboard/notifications');
      if (response.ok) {
        const data = await response.json();
        
        // Check for new notifications
        if (notifications && data.totalNotifications > previousCount) {
          showBrowserNotification(data);
          playNotificationSound();
        }
        
        setNotifications(data);
        setPreviousCount(data.totalNotifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const showBrowserNotification = (data: NotificationData) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const newSubmissions = data.newContactSubmissions;
      if (newSubmissions > 0) {
        new Notification('New Contact Submissions', {
          body: `You have ${newSubmissions} new contact submission${newSubmissions > 1 ? 's' : ''} to review`,
          icon: '/favicon.svg',
          tag: 'contact-submission'
        });
      }
    }
  };

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Sound play failed:', e));
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    fetchNotifications();
    requestNotificationPermission();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    refreshNotifications: fetchNotifications,
    requestNotificationPermission
  };
} 