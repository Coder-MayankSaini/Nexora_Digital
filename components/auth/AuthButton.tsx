'use client';

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/useSession';
import { LogIn, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuthButtonProps {
  scrolled?: boolean;
}

export default function AuthButton({ scrolled = false }: AuthButtonProps) {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className={cn(
          "h-9 transition-all duration-300",
          scrolled 
            ? "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200" 
            : "bg-white/10 border-white/20 text-white hover:bg-white/20"
        )}
      >
        <span className="text-sm">Loading...</span>
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className={cn(
              "w-8 h-8 rounded-full border-2",
              scrolled ? "border-gray-200" : "border-white/20"
            )}
          />
        ) : (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            scrolled ? "bg-gray-200" : "bg-white/10"
          )}>
            <User className={cn(
              "w-5 h-5",
              scrolled ? "text-gray-700" : "text-white/80"
            )} />
          </div>
        )}
        <span className={cn(
          "hidden md:block text-sm",
          scrolled ? "text-gray-700" : "text-white/90"
        )}>
          {session.user.name || session.user.email}
        </span>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            className={cn(
              "h-9 flex items-center gap-1 transition-all duration-300",
              scrolled 
                ? "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200" 
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            )}
          >
            <LogOut size={16} />
            <span className="text-sm">Sign Out</span>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={() => signIn()}
        size="sm"
        className="h-9 flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none shadow-md transition-all duration-300"
      >
        <LogIn size={16} />
        <span className="text-sm">Sign In</span>
      </Button>
    </motion.div>
  );
} 