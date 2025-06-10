'use client';

import { useSession as useNextAuthSession } from 'next-auth/react';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: 'USER' | 'EDITOR' | 'ADMIN';
}

export interface Session {
  user: User;
  expires: string;
}

export function useSession() {
  const { data: session, status } = useNextAuthSession();
  
  return {
    session: session as Session | null,
    status,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  };
}

export function useRequiredRole(requiredRole: 'ADMIN' | 'EDITOR') {
  const { session } = useSession();
  
  const hasRole = () => {
    if (!session?.user?.role) return false;
    
    if (requiredRole === 'ADMIN') {
      return session.user.role === 'ADMIN';
    }
    
    if (requiredRole === 'EDITOR') {
      return session.user.role === 'ADMIN' || session.user.role === 'EDITOR';
    }
    
    return false;
  };
  
  return {
    hasRole: hasRole(),
    role: session?.user?.role,
  };
} 