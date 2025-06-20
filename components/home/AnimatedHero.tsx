'use client';

import { motion, useScroll, useTransform, Variants, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Use inView for lazy animations
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  });

  // Check if mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Simplified parallax effects with reduced intensity
  const y1 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : (isMobile ? 20 : 30)]);
  const y2 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : (isMobile ? -15 : -25)]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Simplified animation variants with faster timing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15, // More damped for less bounce
        stiffness: 300, // Higher stiffness for faster animation
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        delay: 0.8, // Reduced delay
        duration: 0.5,
      },
    },
  };

  // Split text into letters for animation
  const mainText = "Nexora";
  const letters = mainText.split("");

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simplified animated background elements */}
      <motion.div
        style={{ y: y1, willChange: 'transform' }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full filter blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full filter blur-[100px] md:blur-[128px]" />
      </motion.div>

      {/* Simplified grid pattern - only on desktop */}
      {!shouldReduceMotion && !isMobile && (
        <motion.div
          style={{ y: y2, opacity, willChange: 'transform, opacity' }}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        ref={ref}
        style={{ y: y1, willChange: 'transform' }}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Animated logo/text */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.1, 
                transition: { duration: 0.2 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Simplified subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mb-8"
        >
          <motion.p className="text-lg md:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed">
            Building the future with{' '}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold"
            >
              innovative web solutions
            </motion.span>
          </motion.p>
        </motion.div>

        {/* CTA Button - Simplified */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <Link href="/contact">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <motion.span
                  animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Simplified scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={!shouldReduceMotion ? { y: [0, 8, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 cursor-pointer hover:text-white/70 transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Minimal floating orbs - only 2 and only on desktop */}
      {!shouldReduceMotion && !isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${139 + i * 20}, ${92 + i * 10}, 246, 0.08) 0%, transparent 70%)`,
                left: `${20 + i * 50}%`,
                top: `${30 + i * 30}%`,
                willChange: 'transform',
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
} 