'use client';

import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Link from 'next/link';

export default function LocalSEOPage() {
  const services = [
    'Google Business Profile Setup & Optimization',
    'Local SEO & Map Pack Visibility',
    'Review Management & Reputation Building',
    'Local Citation Building',
    'Location-based Keyword Targeting'
  ];

  return (
    <>
      <Header />
      <div className="bg-white pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-4 mb-6 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
              >
                <MapPin className="w-8 h-8" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                GMB Optimization & Local SEO
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Attract more local customers & improve visibility with our comprehensive local search solutions.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg">
                <h2>Dominate Local Search Results</h2>
                <p>
                  In today's competitive market, being visible to local customers is essential for business growth. 
                  Our Local SEO services help you enhance your online presence where it matters most—in your community.
                </p>
                
                <p>
                  We specialize in optimizing your Google Business Profile, improving your local search rankings, and 
                  ensuring your business appears prominently when potential customers search for products or services in your area.
                </p>
                
                <h3>Our Local SEO Services Include:</h3>
                
                <div className="mt-8 grid gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start bg-blue-50 p-4 rounded-lg"
                    >
                      <span className="bg-blue-600 text-white p-1 rounded-full mr-3 flex-shrink-0">
                        <Check className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900">{service}</h4>
                        <p className="text-blue-700">
                          {getServiceDescription(service)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="mt-12">Why Local SEO Matters</h3>
                <p>
                  97% of consumers search online for local businesses, and 76% of people who search for something 
                  nearby on their smartphone visit a business within a day. Local SEO ensures you're visible 
                  exactly when and where customers are looking for services like yours.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started with Local SEO
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
    case 'Google Business Profile Setup & Optimization':
      return 'We create and optimize your Google Business Profile to increase local visibility and attract more customers.';
    case 'Local SEO & Map Pack Visibility':
      return 'Appear in Google Maps when customers search nearby, ensuring your business stands out in local search results.';
    case 'Review Management & Reputation Building':
      return 'Build a strong online reputation with strategies to generate positive reviews and effectively manage feedback.';
    case 'Local Citation Building':
      return 'Create consistent business listings across directories to strengthen your local search presence.';
    case 'Location-based Keyword Targeting':
      return 'Target specific geographic keywords to reach customers in your service areas when they are ready to buy.';
    default:
      return '';
  }
} 