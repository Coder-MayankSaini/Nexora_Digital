'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Favicon } from './ui/favicon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Favicon size={32} className="transition-transform group-hover:scale-110" />
          </motion.div>
          <span className={`bg-gradient-to-r ${isScrolled ? 'from-purple-700 to-indigo-600' : 'from-white to-blue-100'} bg-clip-text text-transparent transition-all duration-300 tracking-tight`}>
            Nexora
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group"
            >
              <motion.span
                className={`transition-colors font-medium text-sm uppercase tracking-wider ${
                  isActive(link.href)
                    ? isScrolled
                      ? 'text-purple-700'
                      : 'text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:text-purple-700'
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {link.label}
              </motion.span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full ${
                isActive(link.href) ? 'w-full' : ''
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-lg shadow-xl absolute top-full left-0 right-0 border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="container mx-auto px-6 py-5 flex flex-col space-y-5 overflow-hidden">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative py-2 flex items-center group"
                  >
                    <motion.span
                      className={`text-lg ${isActive(link.href)
                        ? 'text-purple-700 font-medium'
                        : 'text-gray-700 group-hover:text-purple-700'
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.label}
                    </motion.span>
                    {isActive(link.href) && (
                      <motion.div
                        className="absolute left-0 h-full w-1 bg-gradient-to-b from-purple-700 to-indigo-600 rounded-r-full"
                        layoutId="activeMobileNavIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 