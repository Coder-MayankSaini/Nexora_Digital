'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl">
          <span className={isScrolled ? 'text-purple-600' : 'text-white'}>Nexora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href)
                  ? isScrolled
                    ? 'text-purple-600 font-medium'
                    : 'text-white font-medium'
                  : isScrolled
                  ? 'text-gray-700 hover:text-purple-600'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Button */}
          {status === 'loading' ? (
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-md"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isScrolled
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isScrolled
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 rounded-md transition-colors ${
                isScrolled
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 ${
                  isActive(link.href)
                    ? 'text-purple-600 font-medium'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Button */}
            {status === 'loading' ? (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
            ) : session ? (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/dashboard"
                  className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-center"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-center"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 