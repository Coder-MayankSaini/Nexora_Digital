'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  
  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navRef = useRef<HTMLDivElement>(null);

  // Smooth spring animation for mouse
  const springConfig = { damping: 25, stiffness: 700 };
  const navX = useSpring(mouseX, springConfig);
  const navY = useSpring(mouseY, springConfig);

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Handle scroll behavior and hash changes
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (offset / height) * 100;
      
      setScrollProgress(progress);
      setScrolled(offset > 50);
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

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { 
        duration: 0.5,
        rotate: { duration: 0.3 }
      }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-blue-600 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      <motion.header 
        ref={navRef}
        variants={headerVariants}
        initial="initial"
        animate="animate"
        style={{ x: navX, y: navY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled 
            ? "backdrop-blur-xl bg-white/5 shadow-2xl border-b border-white/10" 
            : "backdrop-blur-md bg-white/5 border-b border-white/5"
        )}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              'linear-gradient(to right, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
              'linear-gradient(to right, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              'linear-gradient(to right, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Animated particles/dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: -10,
              }}
              animate={{ 
                x: Math.random() * 100 + '%',
                y: '110%',
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className={cn(
          "container h-full mx-auto px-6 max-w-7xl relative transition-all duration-500",
          scrolled ? "py-3" : "py-4"
        )}>
          <div className="flex items-center justify-between h-full">
            {/* Animated Logo */}
            <motion.div 
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="relative"
            >
              <Link href="/" className="relative group flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                />
                
                {/* Animated icon */}
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </motion.div>
                
                {/* Animated text */}
                <motion.span 
                  className="relative text-2xl font-bold"
                >
                  {'Nexora'.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
                
                {/* Animated underline */}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

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
                          className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"
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
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg backdrop-blur-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Text with animation */}
                    <motion.span 
                      className="relative z-10 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.span>
                    
                    {/* Animated dots */}
                    {isActive(link.href) && (
                      <motion.span
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Animated Auth Button */}
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
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
              className="fixed top-[60px] left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl z-40 md:hidden border border-white/20 overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <nav className="relative p-6 flex flex-col gap-2">
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
                        "block py-3 px-4 rounded-lg transition-all duration-300",
                        "hover:bg-white/10 hover:backdrop-blur-sm",
                        isActive(link.href) 
                          ? 'text-white bg-white/10 font-medium' 
                          : 'text-white/80'
                      )}
                    >
                      <motion.span
                        whileHover={{ x: 10 }}
                        className="flex items-center justify-between"
                      >
                        {link.label}
                        {isActive(link.href) && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.span>
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