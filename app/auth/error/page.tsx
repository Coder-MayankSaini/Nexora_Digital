'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('An unknown error occurred');
  
  useEffect(() => {
    const error = searchParams?.get('error');
    if (error) {
      switch (error) {
        case 'OAuthSignin':
          setErrorMessage('Error starting the OAuth sign-in process');
          break;
        case 'OAuthCallback':
          setErrorMessage('Error during the OAuth callback');
          break;
        case 'OAuthCreateAccount':
          setErrorMessage('Could not create user account with OAuth provider');
          break;
        case 'EmailCreateAccount':
          setErrorMessage('Could not create user account with email provider');
          break;
        case 'Callback':
          setErrorMessage('Error in the OAuth callback handler route');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('Email already exists with different provider');
          break;
        case 'EmailSignin':
          setErrorMessage('Error sending the email for sign in');
          break;
        case 'CredentialsSignin':
          setErrorMessage('Invalid credentials');
          break;
        case 'SessionRequired':
          setErrorMessage('You must be signed in to access this page');
          break;
        case 'Default':
        default:
          setErrorMessage('An unknown error occurred during authentication');
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-purple-900 px-4 py-16">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-red-100 p-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Authentication Error</h1>
          <p className="mb-6 text-center text-gray-600">{errorMessage}</p>
          
          <div className="mt-4 flex space-x-4">
            <Link
              href="/login"
              className="rounded-md bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 