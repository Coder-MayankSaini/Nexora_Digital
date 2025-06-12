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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Services
          </h2>
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
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon with simple background */}
              <div className="mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r",
                  service.color
                )}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>

              {/* Learn more link */}
              <div className="mt-4 flex items-center text-sm font-semibold">
                <span className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  service.color
                )}>
                  Learn more
                </span>
                <span className="ml-2">→</span>
              </div>
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