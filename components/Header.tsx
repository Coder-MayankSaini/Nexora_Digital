'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AuthButton from '@/components/auth/AuthButton';
import { useSession } from '@/lib/useSession';

export default function Header() {
  const { session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState('');
  
  // Handle scroll behavior and hash changes
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Get hash on client-side only
    setHash(window.location.hash);
    
    // Listen for hash changes
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path || 
           (path !== '/' && pathname?.startsWith(path)) ||
           (path.includes('#') && pathname === '/' && hash === path.split('#')[1]);
  };

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    ...(session ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const logoAnimation = {
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.3, type: 'spring', stiffness: 300 } 
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 border-b border-white/10 ${
        scrolled 
          ? 'h-[50px] bg-gradient-to-r from-indigo-900/80 to-purple-900/80 shadow-lg' 
          : 'h-[60px] bg-gradient-to-r from-indigo-900/60 to-purple-900/60'
      }`}
    >
      <div className="container h-full mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div 
            whileHover="hover" 
            variants={logoAnimation}
            className="relative h-[34px] flex items-center"
          >
            <Link href="/" className="relative group flex items-center">
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ 
                  backgroundImage: "linear-gradient(to right, #60a5fa, #c084fc, #60a5fa)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: ["0% center", "100% center"],
                  transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                Nexora
              </motion.span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center gap-8"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link 
                  href={link.href} 
                  className="relative group px-4 py-2"
                >
                  <span className={`text-sm transition-colors duration-300 ${
                    isActive(link.href) ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1 left-1/2 right-1/2 h-0.5 bg-white/80 transform -translate-x-1/2 transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants} className="ml-2">
              <AuthButton />
            </motion.div>
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <AuthButton />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-gradient-to-r from-indigo-900/95 to-purple-900/95 backdrop-blur-md shadow-lg absolute top-full left-0 right-0 border-t border-white/10"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-4 block text-lg relative ${
                      isActive(link.href) ? 'text-white font-medium' : 'text-white/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="activeIndicatorMobile"
                        className="absolute left-0 bottom-0 h-0.5 w-12 bg-white/80"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 