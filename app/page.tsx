'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Header from '@/components/Header';
import AnimatedHero from '@/components/home/AnimatedHero';
import AnimatedServices from '@/components/home/AnimatedServices';
import AnimatedPortfolio from '@/components/home/AnimatedPortfolio';
import AnimatedTestimonials from '@/components/home/AnimatedTestimonials';
import AnimatedCTA from '@/components/home/AnimatedCTA';
import FloatingParticles from '@/components/home/FloatingParticles';
import { cn } from '@/lib/utils';

export default function Home() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Parallax transforms for different sections
  const heroParallax = useTransform(smoothScrollY, [0, 500], [0, -150]);
  const servicesParallax = useTransform(smoothScrollY, [200, 800], [50, -50]);

  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Floating particles background */}
        <FloatingParticles />
        
        {/* Animated gradient background */}
        <div className="fixed inset-0 -z-10">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />
        </div>

        {/* Hero Section with Parallax */}
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

        {/* Services Section with Parallax */}
        <motion.section 
          style={{ y: servicesParallax }}
          className="relative py-20"
        >
          <AnimatedServices />
        </motion.section>

        {/* Portfolio Section */}
        <section className="relative py-20 bg-white/90 backdrop-blur-sm">
          <AnimatedPortfolio />
        </section>

        {/* Testimonials Section */}
        <section className="relative py-20">
          <AnimatedTestimonials />
        </section>

        {/* Call to Action */}
        <section className="relative py-20 bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-sm">
          <AnimatedCTA />
        </section>
      </main>
    </>
  );
}

// About Section Component
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6,
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

          {/* Animated Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5, type: "spring" }}
                    className={cn(
                      "text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                      stat.color
                    )}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
                {/* Glow effect on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity",
                  stat.color
                )} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image Section with Advanced Animation */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image */}
            <motion.img 
              src="https://picsum.photos/600/400?random=10" 
              alt="About Us"
              className="rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Animated overlay elements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✨</span>
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5+ Years</div>
                  <div className="text-sm text-gray-600">of Excellence</div>
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              Award Winning
            </motion.div>
          </motion.div>

          {/* Background decoration */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 