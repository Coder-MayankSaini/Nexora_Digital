'use client';

import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaGoogle, FaUser } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

export default function LoginContent() {
  const [providers, setProviders] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const errorType = searchParams?.get('error');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders(providers);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Failed to load authentication providers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();

    // Handle error from URL
    if (errorType) {
      switch (errorType) {
        case 'OAuthSignin':
          setError('Error starting the OAuth sign-in process');
          break;
        case 'OAuthCallback':
          setError('Error during the OAuth callback');
          break;
        case 'OAuthCreateAccount':
          setError('Error creating a user account via OAuth');
          break;
        case 'EmailCreateAccount':
          setError('Error creating a user account via email');
          break;
        case 'Callback':
          setError('Error during the callback process');
          break;
        case 'AccessDenied':
          setError('Access denied to this resource');
          break;
        case 'CredentialsSignin':
          setError('Invalid credentials');
          break;
        case 'Configuration':
          setError('There is a problem with the server configuration');
          break;
        default:
          setError('An unknown error occurred during authentication');
      }
    }
  }, [errorType]);

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(true);
      await signIn(providerId, { callbackUrl });
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: credentials.username,
        password: credentials.password,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-purple-900 px-4 py-16">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Sign In</h1>
        
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Demo Credentials Form */}
        <form onSubmit={handleCredentialsSignIn} className="mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="demo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="demo"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-md bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaUser className="mr-2" />
              )}
              {isSubmitting ? 'Signing in...' : 'Sign in with Demo Account'}
            </button>
            <p className="text-center text-sm text-gray-500">
              Use username: <span className="font-medium">demo</span> and password: <span className="font-medium">demo</span>
            </p>
          </div>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="space-y-4">
          {providers ? (
            Object.values(providers).map((provider: any) => {
              // Skip credentials provider as we handle it separately
              if (provider.id === 'credentials') return null;
              
              return (
                <button
                  key={provider.id}
                  onClick={() => handleSignIn(provider.id)}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-md bg-slate-800 px-4 py-3 text-white transition-colors hover:bg-slate-700 disabled:opacity-70"
                >
                  {provider.id === 'google' && <FaGoogle className="mr-2" />}
                  Sign in with {provider.name}
                </button>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No authentication providers available</p>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
} 