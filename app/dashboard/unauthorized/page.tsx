'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useSession } from '@/lib/useSession';

export default function UnauthorizedPage() {
  const { session } = useSession();

  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-2xl text-red-800">Admin Access Only</CardTitle>
            <CardDescription className="text-red-600">
              This dashboard is restricted to administrators only
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Current Role:</strong> {session?.user?.role || 'No role assigned'}
              </p>
              <p className="text-xs text-gray-600">
                You need administrator privileges to access this area.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link href="/admin-login">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <LogIn className="mr-2 h-4 w-4" />
                  Go to Admin Login
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full" variant="ghost">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 