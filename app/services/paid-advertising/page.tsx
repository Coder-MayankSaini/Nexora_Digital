'use client';

import { motion } from 'framer-motion';
import { Target, Check } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PaidAdvertisingPage() {
  const services = [
    'Google Ads Management',
    'Facebook & Instagram Ads',
    'Remarketing Campaigns',
    'Landing Page Optimization',
    'ROI-focused Ad Strategy'
  ];

  return (
    <>
      <Header />
      <div className="bg-white pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-4 mb-6 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
              >
                <Target className="w-8 h-8" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Paid Advertising
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Get in front of customers actively searching for your services with precision targeting and ROI-focused strategies.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg">
                <h2>Strategic Paid Advertising Campaigns</h2>
                <p>
                  When you need immediate visibility and results, paid advertising delivers. Our data-driven 
                  approach ensures your ad spend targets the right audience at the right time, maximizing 
                  your return on investment.
                </p>
                
                <p>
                  From search engines to social media platforms, we craft targeted campaigns that connect 
                  with your ideal customers when they're most likely to convert, helping you grow your 
                  business efficiently.
                </p>
                
                <h3>Our Paid Advertising Services Include:</h3>
                
                <div className="mt-8 grid gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start bg-purple-50 p-4 rounded-lg"
                    >
                      <span className="bg-purple-600 text-white p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-purple-900">{service}</h4>
                        <p className="text-purple-700">
                          {getServiceDescription(service)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="mt-12">Why Paid Advertising Works</h3>
                <p>
                  Paid advertising provides immediate visibility for your business, allowing you to reach 
                  potential customers who are actively searching for your products or services. With precise 
                  targeting options and real-time performance data, paid campaigns can be continuously 
                  optimized for maximum effectiveness and ROI.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started with Paid Advertising
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
    case 'Google Ads Management':
      return 'Strategic PPC campaigns that put your business at the top of search results when customers are looking for your services.';
    case 'Facebook & Instagram Ads':
      return 'Target your ideal customers with precision using demographic, interest, and behavior-based advertising.';
    case 'Remarketing Campaigns':
      return 'Re-engage visitors who have shown interest in your business, bringing them back to your site to complete their purchase.';
    case 'Landing Page Optimization':
      return 'Create high-converting landing pages that turn clicks into customers and maximize your ad spend.';
    case 'ROI-focused Ad Strategy':
      return 'Data-driven campaigns that continuously optimize for the best possible return on your advertising investment.';
    default:
      return '';
  }
} 