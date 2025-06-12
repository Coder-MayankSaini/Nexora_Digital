'use client';

import { motion, useScroll, useTransform, Variants, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  
  // Use inView for lazy animations
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  });
  
  // Parallax effects - only use transform for better performance
  const y1 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, shouldReduceMotion ? 0 : -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Text reveal animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        delay: 1,
        duration: 0.8,
      },
    },
  };

  // Split text into letters for animation
  const mainText = "Nexora";
  const letters = mainText.split("");

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements - simplified and hardware accelerated */}
      <motion.div
        style={{ y: y1, willChange: 'transform' }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px]" />
      </motion.div>

      {/* Parallax grid pattern - only render if not reducing motion */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ y: y2, opacity, willChange: 'transform, opacity' }}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
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
          className="text-7xl md:text-9xl font-bold mb-6"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.2, 
                rotate: [-5, 5, -5, 0],
                transition: { duration: 0.3 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <motion.p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed">
            Building the future with{' '}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold"
            >
              innovative web solutions
            </motion.span>
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            variants={buttonVariants}
            whileHover={!shouldReduceMotion ? { 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
            } : {}}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {!shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover={!shouldReduceMotion ? { 
              scale: 1.05,
              borderColor: "rgba(255, 255, 255, 0.5)"
            } : {}}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={!shouldReduceMotion ? { y: [0, 10, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/50 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Animated decorative elements - reduced to only 3 and conditionally rendered */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Floating orbs - reduced to 3 instead of 5 */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${139 + i * 20}, ${92 + i * 10}, 246, 0.1) 0%, transparent 70%)`,
                left: `${15 + i * 30}%`,
                top: `${20 + i * 25}%`,
                willChange: 'transform',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10 + i * 2,
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