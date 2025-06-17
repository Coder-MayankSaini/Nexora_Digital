'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { Code, Megaphone, Target, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const services = [
  {
    icon: MapPin,
    title: 'GMB Optimization & Local SEO',
    description: 'Attract more local customers & improve visibility. Enhance your Google Business Profile and strengthen your local search presence.',
    color: 'from-blue-600 to-purple-600',
    delay: 0,
    link: '/services/local-seo',
    features: [
      'Google Business Profile Setup & Optimization',
      'Local SEO & Map Pack Visibility',
      'Review Management & Reputation Building',
      'Local Citation Building',
      'Location-based Keyword Targeting'
    ]
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Gain organic traffic that converts to sales. Position yourself as an industry expert with strategic digital marketing.',
    color: 'from-green-600 to-teal-600',
    delay: 0.1,
    link: '/services/digital-marketing',
    features: [
      'Search Engine Optimization (SEO)',
      'Content Marketing Strategy',
      'Social Media Management',
      'Email Marketing Campaigns',
      'Analytics & Performance Tracking'
    ]
  },
  {
    icon: Target,
    title: 'Paid Advertising',
    description: 'Get in front of customers actively searching for your services with precision targeting and ROI-focused strategies.',
    color: 'from-purple-600 to-pink-600',
    delay: 0.2,
    link: '/services/paid-advertising',
    features: [
      'Google Ads Management',
      'Facebook & Instagram Ads',
      'Remarketing Campaigns',
      'Landing Page Optimization',
      'ROI-focused Ad Strategy'
    ]
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Create responsive websites and e-commerce solutions that turn visitors into customers, with ongoing maintenance and support.',
    color: 'from-blue-600 to-cyan-600',
    delay: 0.3,
    link: '/services/web-development',
    features: [
      'Responsive Website Design',
      'E-commerce Solutions',
      'WordPress Development',
      'Website Maintenance & Support',
      'Speed & Performance Optimization'
    ]
  }
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

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive digital solutions to transform your online presence and drive business growth
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon with gradient background */}
              <div className="mb-6">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r",
                  service.color
                )}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

              {/* Features list */}
              <motion.ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    variants={featureVariants}
                    custom={i}
                  >
                    <span className={cn(
                      "inline-block w-5 h-5 mr-2 rounded-full bg-gradient-to-r flex-shrink-0 mt-1",
                      service.color
                    )}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Learn more link */}
              <div className="mt-auto pt-4">
                <Link href={service.link}>
                  <div className="flex items-center text-sm font-semibold group">
                    <span className={cn(
                      "bg-gradient-to-r bg-clip-text text-transparent group-hover:underline",
                      service.color
                    )}>
                      Learn more
                    </span>
                    <motion.span 
                      className="ml-2 transition-transform"
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.span>
                  </div>
                </Link>
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
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Schedule a Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 