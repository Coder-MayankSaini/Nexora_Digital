'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import AuthButton from '@/components/auth/AuthButton';
import { useSession } from '@/lib/useSession';
import { cn } from '@/lib/utils';

export default function Header() {
  const { session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hash, setHash] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Handle scroll behavior and hash changes
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (offset / height) * 100 : 0;
      
      setScrollProgress(progress);
      setScrolled(offset > 50);
    };
    
    // Get hash on client-side only
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);
      
      // Listen for hash changes
      const handleHashChange = () => {
        setHash(window.location.hash);
      };
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('hashchange', handleHashChange);
      
      // Initial scroll check
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    
    if (path.includes('#')) {
      const [basePath, hashValue] = path.split('#');
      return pathname === '/' && hash === `#${hashValue}`;
    }
    
    return pathname === path || (path !== '/' && pathname?.startsWith(path));
  };

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    ...(session ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 0.3,
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: -10, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-blue-600 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <motion.header 
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "backdrop-blur-xl bg-white/10 shadow-lg border-b border-white/10" 
            : "backdrop-blur-md bg-white/5 border-b border-white/5"
        )}
      >
        <div className={cn(
          "container mx-auto px-4 max-w-7xl relative transition-all duration-300",
          scrolled ? "py-3" : "py-4"
        )}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-2 group">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Nexora
              </span>
              
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative"
                >
                  <Link 
                    href={link.href} 
                    className={cn(
                      "relative px-4 py-2 rounded-lg transition-all duration-300",
                      "hover:text-white",
                      isActive(link.href) ? 'text-white' : 'text-white/70'
                    )}
                  >
                    {/* Hover background */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.span
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          layoutId="navHover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Active indicator */}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Text */}
                    <span className="relative z-10 text-sm font-medium">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Auth Button */}
              <motion.div
                custom={navLinks.length}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                className="ml-4"
              >
                <AuthButton />
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <AuthButton />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-white/10"
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-[60px] left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl z-40 md:hidden border border-white/20 overflow-hidden"
            >
              <nav className="relative p-4 flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block py-3 px-4 rounded-lg transition-colors",
                        "hover:bg-white/10",
                        isActive(link.href) 
                          ? 'text-white bg-white/10 font-medium' 
                          : 'text-white/80'
                      )}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        {isActive(link.href) && (
                          <span className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 