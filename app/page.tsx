'use client';

import { useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import AnimatedHero from '@/components/home/AnimatedHero';
import { cn } from '@/lib/utils';

// Lazy load heavy components to improve initial page load
const AnimatedServices = dynamic(() => import('@/components/home/AnimatedServices'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div></div>,
  ssr: false
});

const AnimatedPortfolio = dynamic(() => import('@/components/home/AnimatedPortfolio'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div></div>,
  ssr: false
});

const AnimatedTestimonials = dynamic(() => import('@/components/home/AnimatedTestimonials'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div></div>,
  ssr: false
});

const AnimatedCTA = dynamic(() => import('@/components/home/AnimatedCTA'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>,
  ssr: false
});

const FloatingParticles = dynamic(() => import('@/components/home/FloatingParticles'), {
  loading: () => null,
  ssr: false
});

export default function Home() {
  const { scrollY } = useScroll();
  // Simplified spring configuration for better performance
  const smoothScrollY = useSpring(scrollY, { stiffness: 50, damping: 20, mass: 1 });

  // Reduced parallax transforms for better performance
  const heroParallax = useTransform(smoothScrollY, [0, 500], [0, -50]);

  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Floating particles background - lazy loaded */}
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>
        
        {/* Simplified animated gradient background */}
        <div className="fixed inset-0 -z-10">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(120, 50, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(120, 50, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(120, 50, 255, 0.05) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />
        </div>

        {/* Hero Section with Reduced Parallax */}
        <motion.section 
          style={{ y: heroParallax }}
          className="relative min-h-screen"
        >
          <AnimatedHero />
        </motion.section>

        {/* About Section with Scroll Animations */}
        <section className="relative py-20 bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-sm">
          <AboutSection />
        </section>

        {/* Services Section - Lazy Loaded */}
        <section className="relative py-20">
          <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div></div>}>
            <AnimatedServices />
          </Suspense>
        </section>

        {/* Portfolio Section - Lazy Loaded */}
        <section className="relative py-20 bg-white/90 backdrop-blur-sm">
          <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div></div>}>
            <AnimatedPortfolio />
          </Suspense>
        </section>

        {/* Testimonials Section - Lazy Loaded */}
        <section className="relative py-20">
          <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div></div>}>
            <AnimatedTestimonials />
          </Suspense>
        </section>

        {/* Call to Action - Lazy Loaded */}
        <section className="relative py-20 bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-sm">
          <Suspense fallback={<div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
            <AnimatedCTA />
          </Suspense>
        </section>
      </main>
    </>
  );
}

// Optimized About Section Component
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Reduced stagger for faster appearance
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster animations
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const stats = [
    { value: '150+', label: 'Projects Completed', color: 'from-purple-600 to-pink-600' },
    { value: '99%', label: 'Client Satisfaction', color: 'from-blue-600 to-cyan-600' },
    { value: '4.9★', label: 'Average Rating', color: 'from-pink-600 to-orange-600' },
    { value: '24/7', label: 'Support Available', color: 'from-green-600 to-teal-600' },
  ];

  return (
    <div className="container mx-auto px-6">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Text Content */}
        <div>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Crafting Digital{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            We combine cutting-edge technology with creative design to deliver 
            web experiences that not only look stunning but perform exceptionally. 
            Our passion for innovation drives every project we undertake.
          </motion.p>

          {/* Simplified Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }} // Reduced hover scale
                className="relative group"
              >
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.3, type: "spring" }}
                    className={cn(
                      "text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                      stat.color
                    )}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Simplified Image Section */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image */}
            <motion.img 
              src="https://picsum.photos/600/400?random=10" 
              alt="About Us"
              className="rounded-2xl shadow-xl w-full h-auto"
              loading="lazy"
            />
            
            {/* Floating card - simplified */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">5.0</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Excellent</div>
                  <div className="text-sm text-gray-600">Client Rating</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 