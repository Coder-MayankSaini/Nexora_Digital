'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Favicon } from './ui/favicon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
    setIsServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
    { href: '/services/local-seo', label: 'Local SEO' },
    { href: '/services/paid-advertising', label: 'Paid Advertising' },
    { href: '/services/web-development', label: 'Web Development' },
  ];

  const isActive = (path: string) => pathname === path;
  const isServicesActive = () => pathname.startsWith('/services');

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
          
          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 relative"
            >
              <motion.span
                className={`transition-colors font-medium text-sm uppercase tracking-wider ${
                  isServicesActive()
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
                Services
              </motion.span>
              <ChevronDown 
                className={`w-4 h-4 transition-all duration-200 ${
                  isServicesActive()
                    ? isScrolled
                      ? 'text-purple-700'
                      : 'text-white'
                    : isScrolled
                    ? 'text-gray-700 group-hover:text-purple-700'
                    : 'text-white/90 group-hover:text-white'
                } ${isServicesOpen ? 'rotate-180' : ''}`}
              />
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full ${
                isServicesActive() ? 'w-full' : ''
              }`}></span>
            </button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md shadow-xl rounded-lg border border-gray-100 py-2"
                >
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                    >
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="block"
                      >
                        {service.label}
                      </motion.span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              
              {/* Mobile Services Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="border-t border-gray-200 pt-5"
              >
                <div className="mb-3">
                  <span className={`text-lg font-medium ${isServicesActive() ? 'text-purple-700' : 'text-gray-700'}`}>
                    Services
                  </span>
                  {isServicesActive() && (
                    <motion.div
                      className="absolute left-0 h-full w-1 bg-gradient-to-b from-purple-700 to-indigo-600 rounded-r-full"
                      layoutId="activeMobileNavIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
                <div className="pl-4 space-y-3">
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-2 text-gray-600 hover:text-purple-700 transition-colors"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 