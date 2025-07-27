'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, Loader2, CheckCircle, Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  country: string;
  services: string[];
  message: string;
};

// Services available
const services = [
  { value: "web-development", label: "Web Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "local-seo", label: "Local SEO" },
  { value: "paid-advertising", label: "Paid Advertising" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Add selected services to form data
      data.services = selectedServices;
      
      // Send data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit form');
      }
      
      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      setSelectedServices([]);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setError(error.message || 'An error occurred while submitting the form');
    }
  };

  // Toggle selection of services
  const toggleService = (value: string) => {
    setSelectedServices(current => {
      if (current.includes(value)) {
        return current.filter(item => item !== value);
      } else {
        return [...current, value];
      }
    });
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
                
                {error ? (
                  <Alert className="bg-red-50 border-red-200 text-red-800 mb-6">
                    <AlertDescription>
                      {error}
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
                      <Label htmlFor="country" className="text-gray-700">Country</Label>
                      <Input
                        id="country"
                        placeholder="Your country"
                        className={`transition-all duration-200 hover:border-purple-400 focus:border-purple-500 ${errors.country ? 'border-red-500' : ''}`}
                        {...register('country', { required: 'Country is required' })}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="services" className="text-gray-700">Services Interested In</Label>
                      <div className="relative">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between text-gray-500 border hover:border-purple-400 focus:border-purple-500"
                            >
                              {selectedServices.length > 0
                                ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                                : "Select services..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <div className="max-h-[200px] overflow-auto p-1">
                              {services.map((service) => (
                                <div
                                  key={service.value}
                                  className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 ${
                                    selectedServices.includes(service.value) ? "bg-slate-100" : ""
                                  }`}
                                  onClick={() => {
                                    toggleService(service.value);
                                  }}
                                >
                                  <div className={`mr-2 h-4 w-4 border ${
                                    selectedServices.includes(service.value) ? "bg-purple-600 border-purple-600" : "border-gray-300"
                                  } flex items-center justify-center rounded`}>
                                    {selectedServices.includes(service.value) && <Check className="h-3 w-3 text-white" />}
                                  </div>
                                  <span>{service.label}</span>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      {/* Display selected services */}
                      {selectedServices.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedServices.map(value => (
                            <Badge 
                              key={value} 
                              variant="secondary"
                              className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer"
                              onClick={() => toggleService(value)}
                            >
                              {services.find(s => s.value === value)?.label}
                              <span className="ml-1 text-xs">✕</span>
                            </Badge>
                          ))}
                        </div>
                      )}
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