'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    quote: "Nexora transformed our digital presence completely. The results exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    id: 2,
    quote: "Professional, innovative, and reliable. Working with Nexora was a game-changer for our business.",
    author: "Michael Chen",
    position: "CTO",
    company: "Design Co.",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    id: 3,
    quote: "The attention to detail and creative solutions provided by Nexora are unmatched.",
    author: "Emily Rodriguez",
    position: "Marketing Director",
    company: "Creative Agency",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
  },
  {
    id: 4,
    quote: "They delivered beyond our expectations. Our conversion rates increased by 150%!",
    author: "David Park",
    position: "Founder",
    company: "StartupHub",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
  },
];

export default function AnimatedTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized auto-play with cleanup
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion]);

  // Memoized handlers
  const handlePrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  }, []);

  // Memoized current testimonial
  const currentTestimonial = useMemo(() => testimonials[currentIndex], [currentIndex]);

  // Memoized star rating component
  const StarRating = useMemo(() => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex gap-1 mb-6"
    >
      {[...Array(currentTestimonial.rating)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.05 }} // Faster stagger
          className="text-yellow-400 text-2xl"
        >
          ★
        </motion.span>
      ))}
    </motion.div>
  ), [currentTestimonial.rating]);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simplified background elements - only if motion is not reduced */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => ( // Reduced from 5 to 3
            <motion.div
              key={i}
              className="absolute w-48 h-48 bg-white/3 rounded-full" // Reduced size and opacity
              style={{
                left: `${20 + i * 30}%`,
                top: `${25 + i * 25}%`,
              }}
              animate={{
                x: [0, 20, 0], // Reduced movement
                y: [0, -20, 0],
                scale: [1, 1.05, 1], // Reduced scale change
              }}
              transition={{
                duration: 12 + i * 3, // Slower animations
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }} // Faster transition
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1 }} // Reduced delay
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-extrabold">
              Clients Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }} // Reduced delay
            className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow"
          >
            Don't just take our word for it - hear from our satisfied clients
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }} // Reduced movement
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: prefersReducedMotion ? 1 : 0.8, rotate: 0 }} // Simplified animation
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", damping: 20 }} // Faster, more damped
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <Quote className="w-8 h-8 text-white" />
              </motion.div>

              {/* Testimonial Content */}
              <motion.blockquote
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }} // Faster
                className="text-xl md:text-2xl text-white mb-8 italic leading-relaxed"
              >
                "{currentTestimonial.quote}"
              </motion.blockquote>

              {/* Rating Stars - Memoized */}
              {StarRating}

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }} // Faster
                className="flex items-center gap-4"
              >
                <motion.img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-16 h-16 rounded-full border-2 border-white/20"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} // Reduced hover effect
                  transition={{ type: "spring", duration: 0.2 }}
                  loading="lazy"
                />
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-purple-200">
                    {currentTestimonial.position} at {currentTestimonial.company}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} // Reduced scale
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={handlePrevious}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "w-8 bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={handleNext}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Simplified background decorations - only if motion is not reduced */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.5, // Reduced opacity
                scale: [1, 1.1, 1], // Reduced scale change
                rotate: [0, 180, 360],
              }}
              transition={{
                opacity: { delay: 0.6 },
                scale: { duration: 30, repeat: Infinity, ease: "linear" }, // Slower
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              }}
              className="absolute top-10 left-10 w-16 h-16 border border-purple-400/10 rounded-full" // Smaller and more subtle
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.5,
                scale: [1, 1.15, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                opacity: { delay: 0.8 },
                scale: { duration: 35, repeat: Infinity, ease: "linear" },
                rotate: { duration: 35, repeat: Infinity, ease: "linear" },
              }}
              className="absolute bottom-10 right-10 w-24 h-24 border border-blue-400/10 rounded-full"
            />
          </>
        )}
      </div>
    </section>
  );
} 