'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Contact form type
type ContactFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Success
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 pt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      {/* Page Header */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          Have a question or want to work together? We'd love to hear from you.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <AlertDescription>
                      Thank you for your message! We'll get back to you shortly.
                    </AlertDescription>
                  </Alert>
                ) : null}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        className={`transition-all duration-200 hover:border-purple-400 focus:border-purple-500 ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className={`transition-all duration-200 hover:border-purple-400 focus:border-purple-500 ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Your phone number"
                        className={`transition-all duration-200 hover:border-purple-400 focus:border-purple-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                        {...register('phoneNumber', { required: 'Phone number is required' })}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-700">Company Name <span className="text-gray-400 text-sm">(Optional)</span></Label>
                      <Input
                        id="companyName"
                        placeholder="Your company name"
                        className="transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
                        {...register('companyName')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your project, needs, or questions..."
                        className={`min-h-[150px] resize-y transition-all duration-200 hover:border-purple-400 focus:border-purple-500 ${errors.message ? 'border-red-500' : ''}`}
                        {...register('message', { required: 'Message is required' })}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right: Contact Info & Map */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Our Office</h3>
                      <p className="text-gray-600">
                        123 Innovation Drive<br />
                        Tech District, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Us</h3>
                      <p className="text-gray-600">
                        <Link href="mailto:marketing.nexoradigital@gmail.com" className="text-purple-600 hover:text-purple-700 transition-colors">
                          marketing.nexoradigital@gmail.com
                        </Link>
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Call Us</h3>
                      <p className="text-gray-600">
                        <Link href="tel:+918525001313" className="text-purple-600 hover:text-purple-700 transition-colors">
                          +91-8525001313
                        </Link>
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Mon-Fri, 9am-5pm PT
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Map */}
            <motion.div 
              className="relative h-[300px] rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://picsum.photos/800/400?random=100"
                alt="Office Location Map"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Nexora Digital Headquarters</p>
                <p className="text-sm text-white/80">Tech District, CA</p>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <motion.a
                href="#"
                className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -z-10 opacity-5 w-full h-full overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full"
          animate={{ 
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-20 right-10 w-60 h-60 bg-blue-300 rounded-full"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-40 h-40 bg-pink-300 rounded-full"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
} 