'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AnimatedBackground from '@/components/login/AnimatedBackground';
import { cn } from '@/lib/utils';

export default function LoginContent() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, [searchParams]);

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider);
      setError(null);
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(null);
    }
  };

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'OAuthSignin':
        return 'Error constructing an authorization URL.';
      case 'OAuthCallback':
        return 'Error handling the response from the OAuth provider.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth provider user in the database.';
      case 'EmailCreateAccount':
        return 'Could not create email provider user in the database.';
      case 'Callback':
        return 'Error in the OAuth callback handler route.';
      case 'OAuthAccountNotLinked':
        return 'Email already exists with different provider.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl mx-4"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20"
            >
              <div className="relative w-full max-w-md">
                {/* Animated Tech Illustration */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="80"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="120"
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="160"
                      fill="none"
                      stroke="url(#gradient3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.9 }}
                    />
                    
                    {/* Animated dots */}
                    {[...Array(8)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={200 + 140 * Math.cos((i * Math.PI * 2) / 8)}
                        cy={200 + 140 * Math.sin((i * Math.PI * 2) / 8)}
                        r="4"
                        fill="#fff"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          delay: 1 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    ))}
                    
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#6366F1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-center mt-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to Nexora Digital</h2>
                  <p className="text-white/70">Transform your digital presence with cutting-edge solutions</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Authentication */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md space-y-8"
              >
                {/* Logo and Header */}
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5, delay: 0.4 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h1 className="text-3xl font-bold text-white">Sign In</h1>
                    <p className="text-white/70 mt-2">Access your Nexora Digital account</p>
                  </motion.div>
                </div>

                {/* Error Alert */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="bg-red-500/20 border-red-500/50 text-white">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* OAuth Buttons */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <button
                      onClick={() => handleSignIn('google')}
                      disabled={isLoading !== null}
                      className={cn(
                        "relative w-full group",
                        "px-6 py-4 rounded-xl",
                        "bg-white/10 backdrop-blur-sm",
                        "border border-white/20",
                        "text-white font-medium",
                        "transition-all duration-300",
                        "hover:bg-white/20 hover:border-white/30",
                        "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
                        "hover:scale-[1.02]",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "disabled:hover:scale-100"
                      )}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        {isLoading === 'google' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <FaGoogle className="w-5 h-5" />
                        )}
                        <span>Continue with Google</span>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <button
                      onClick={() => handleSignIn('github')}
                      disabled={isLoading !== null}
                      className={cn(
                        "relative w-full group",
                        "px-6 py-4 rounded-xl",
                        "bg-white/10 backdrop-blur-sm",
                        "border border-white/20",
                        "text-white font-medium",
                        "transition-all duration-300",
                        "hover:bg-white/20 hover:border-white/30",
                        "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
                        "hover:scale-[1.02]",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "disabled:hover:scale-100"
                      )}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        {isLoading === 'github' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <FaGithub className="w-5 h-5" />
                        )}
                        <span>Continue with GitHub</span>
                      </div>
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-4 text-white/50">Protected by NextAuth</span>
                  </div>
                </motion.div>

                {/* Footer Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-center text-sm text-white/50"
                >
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 