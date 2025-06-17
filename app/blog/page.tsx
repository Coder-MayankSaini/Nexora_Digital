'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PostsList from '@/components/posts/PostsList';
import { SlideUp, FadeIn } from '@/components/animations/ScrollReveal';
import Header from '@/components/Header';

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects for background elements
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <>
      {/* Header/Navbar */}
      <Header />
      
      {/* Hero section with animated background */}
      <section className="relative min-h-[40vh] pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <motion.div
          style={{ y: y1, willChange: 'transform' }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px]" />
        </motion.div>

        {/* Parallax grid pattern */}
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

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Our Blog
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-xl text-gray-300 mb-6"
          >
            Insights, tutorials, and news from the Nexora team
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"
          />
        </div>
      </section>

      {/* Blog content section */}
      <div className="container mx-auto px-4 py-16" ref={containerRef}>
        <SlideUp>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-8 mb-16">
              {/* Featured post section */}
              <FadeIn>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-purple-900/30 p-8 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900/20">
                  <h2 className="text-3xl font-bold mb-6 text-purple-900 dark:text-purple-300">Featured Post</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-80 overflow-hidden rounded-xl">
                      <motion.div 
                        className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 absolute"
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-lg font-medium">The Future of Web Development</span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-sm text-purple-600 dark:text-purple-300 mb-2">May 15, 2023</div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">The Future of Web Development: Trends to Watch in 2023</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Discover the cutting-edge technologies and approaches that are reshaping how we build websites and web applications.
                        From AI-assisted development to new frameworks and tools, stay ahead of the curve.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="self-start px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transition duration-300"
                      >
                        Read Article
                      </motion.button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <SlideUp delay={0.2}>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest Articles</h2>
            </SlideUp>
            
            <SlideUp delay={0.3}>
              <PostsList />
            </SlideUp>
          </div>
        </SlideUp>
      </div>
    </>
  );
} 