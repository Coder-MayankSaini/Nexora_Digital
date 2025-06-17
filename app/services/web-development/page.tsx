'use client';

import { motion } from 'framer-motion';
import { Code, Check } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function WebDevelopmentPage() {
  const services = [
    'Responsive Website Design',
    'E-commerce Solutions',
    'WordPress Development',
    'Website Maintenance & Support',
    'Speed & Performance Optimization'
  ];

  return (
    <>
      <Header />
      <div className="bg-white pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-4 mb-6 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
              >
                <Code className="w-8 h-8" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                Web Development
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Create responsive websites and e-commerce solutions that turn visitors into customers, with ongoing maintenance and support.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg">
                <h2>Custom Website Solutions</h2>
                <p>
                  Your website is often the first impression potential customers have of your business. 
                  We design and develop websites that not only look great but also drive conversions 
                  and support your business goals.
                </p>
                
                <p>
                  From custom designs to e-commerce solutions, our development team creates responsive, 
                  user-friendly websites that deliver exceptional experiences across all devices.
                </p>
                
                <h3>Our Web Development Services Include:</h3>
                
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

                <h3 className="mt-12">Why Professional Web Development Matters</h3>
                <p>
                  A professionally developed website doesn't just look good—it performs. Fast loading times, 
                  intuitive navigation, and strategic design elements all work together to convert visitors into 
                  customers. Plus, with mobile devices accounting for over half of all web traffic, responsive 
                  design is no longer optional.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started with Web Development
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
    case 'Responsive Website Design':
      return 'Create websites that provide seamless experiences across all devices, from desktops to smartphones.';
    case 'E-commerce Solutions':
      return 'Build online stores with secure payment processing, inventory management, and user-friendly shopping experiences.';
    case 'WordPress Development':
      return 'Leverage the world\'s most popular CMS for flexible, scalable websites you can easily update yourself.';
    case 'Website Maintenance & Support':
      return 'Keep your online presence secure, up-to-date, and performing optimally with ongoing technical support.';
    case 'Speed & Performance Optimization':
      return 'Improve page load times, user experience, and search engine rankings with technical optimizations.';
    default:
      return '';
  }
} 