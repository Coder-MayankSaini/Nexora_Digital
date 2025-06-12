'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

// Pre-defined positions for background elements to avoid hydration errors
const backgroundPositions = [
  { left: '15%', top: '20%' },
  { left: '75%', top: '65%' },
  { left: '35%', top: '85%' },
  { left: '85%', top: '30%' },
  { left: '55%', top: '10%' },
];

export default function AnimatedTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {backgroundPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-white/5 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Clients Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-purple-200 max-w-2xl mx-auto"
          >
            Don't just take our word for it - hear from our satisfied clients
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6"
              >
                <Quote className="w-8 h-8 text-white" />
              </motion.div>

              {/* Testimonial Content */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-white mb-8 italic leading-relaxed"
              >
                "{testimonials[currentIndex].quote}"
              </motion.blockquote>

              {/* Rating Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-1 mb-6"
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-yellow-400 text-2xl"
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <motion.img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-16 h-16 rounded-full border-2 border-white/20"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" }}
                />
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-purple-200">
                    {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "w-8 bg-white"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Background Decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            opacity: { delay: 0.6 },
            scale: { duration: 20, repeat: Infinity, ease: "linear" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
          className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-400/20 rounded-full"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            opacity: { delay: 0.8 },
            scale: { duration: 25, repeat: Infinity, ease: "linear" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
          className="absolute bottom-10 right-10 w-32 h-32 border-2 border-blue-400/20 rounded-full"
        />
      </div>
    </section>
  );
} 