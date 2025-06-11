'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Smartphone, Zap, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with cutting-edge technologies',
    color: 'from-purple-600 to-blue-600',
    delay: 0,
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that engage and convert users',
    color: 'from-pink-600 to-purple-600',
    delay: 0.1,
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Responsive designs that work seamlessly across all devices',
    color: 'from-blue-600 to-cyan-600',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast websites optimized for speed and SEO',
    color: 'from-yellow-600 to-orange-600',
    delay: 0.3,
  },
  {
    icon: Globe,
    title: 'E-Commerce',
    description: 'Complete online stores with secure payment processing',
    color: 'from-green-600 to-teal-600',
    delay: 0.4,
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security to protect your digital assets',
    color: 'from-red-600 to-pink-600',
    delay: 0.5,
  },
];

export default function AnimatedServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            whileInView={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(to right, #8B5CF6, #3B82F6, #8B5CF6)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We offer comprehensive digital solutions to transform your business
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {/* Icon with animated background */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r",
                    service.color
                  )}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Animated ring */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100",
                      service.color
                    )}
                    initial={{ scale: 1 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                {/* Learn more link */}
                <motion.div
                  className="mt-4 flex items-center text-sm font-semibold"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className={cn(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    service.color
                  )}>
                    Learn more
                  </span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300",
                  service.color
                )}
                initial={false}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />

              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100",
                    i === 0 ? "bg-purple-400" : i === 1 ? "bg-blue-400" : "bg-pink-400"
                  )}
                  initial={{
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    x: [0, (i - 1) * 30, 0],
                    y: [0, -30 - i * 10, 0],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: '50%',
                    bottom: '20%',
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 