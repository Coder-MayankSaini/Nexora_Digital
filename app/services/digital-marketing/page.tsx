'use client';

import { motion } from 'framer-motion';
import { Megaphone, Check } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function DigitalMarketingPage() {
  const services = [
    'Search Engine Optimization (SEO)',
    'Content Marketing Strategy',
    'Social Media Management',
    'Email Marketing Campaigns',
    'Analytics & Performance Tracking'
  ];

  return (
    <>
      <Header />
      <div className="bg-white pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 to-teal-600 text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-4 mb-6 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
              >
                <Megaphone className="w-8 h-8" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Digital Marketing
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Gain organic traffic that converts to sales. Position yourself as an industry expert.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg">
                <h2>Strategic Digital Marketing Solutions</h2>
                <p>
                  In today's digital landscape, having a strong online presence is crucial for business success. 
                  Our digital marketing services help you connect with your target audience, build brand 
                  awareness, and drive measurable results.
                </p>
                
                <p>
                  We develop customized strategies that combine SEO, content marketing, social media, and analytics 
                  to create a cohesive approach that delivers sustainable growth for your business.
                </p>
                
                <h3>Our Digital Marketing Services Include:</h3>
                
                <div className="mt-8 grid gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start bg-green-50 p-4 rounded-lg"
                    >
                      <span className="bg-green-600 text-white p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-green-900">{service}</h4>
                        <p className="text-green-700">
                          {getServiceDescription(service)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="mt-12">Why Digital Marketing Matters</h3>
                <p>
                  Effective digital marketing helps you reach customers at every stage of their buying journey, 
                  from initial awareness to consideration and purchase. By providing valuable content and 
                  optimizing your online presence, you can build trust with prospects and establish yourself 
                  as an authority in your industry.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started with Digital Marketing
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function getServiceDescription(service: string): string {
  switch (service) {
    case 'Search Engine Optimization (SEO)':
      return 'Improve your organic search visibility to drive more qualified traffic to your website.';
    case 'Content Marketing Strategy':
      return 'Create valuable content that positions you as an industry expert and engages your target audience.';
    case 'Social Media Management':
      return 'Build and grow your brand presence across social media platforms to increase engagement and reach.';
    case 'Email Marketing Campaigns':
      return 'Nurture leads and boost customer retention through strategic email marketing campaigns.';
    case 'Analytics & Performance Tracking':
      return 'Monitor key metrics to understand what works, optimize your strategy, and maximize ROI.';
    default:
      return '';
  }
} 