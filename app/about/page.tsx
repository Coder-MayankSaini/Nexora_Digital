'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3
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

// Company values data
const companyValues = [
  { 
    icon: <CheckCircle className="size-6 text-purple-600" />,
    title: "Innovation",
    description: "We push boundaries with cutting-edge solutions that solve complex problems."
  },
  { 
    icon: <CheckCircle className="size-6 text-purple-600" />,
    title: "Integrity",
    description: "We build trust through transparent communication and ethical practices."
  },
  { 
    icon: <CheckCircle className="size-6 text-purple-600" />,
    title: "Customer Focus",
    description: "Your success drives everything we do, from planning to execution."
  },
  { 
    icon: <CheckCircle className="size-6 text-purple-600" />,
    title: "Collaboration",
    description: "We believe great ideas come from diverse perspectives working together."
  }
];

// Team members data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "https://picsum.photos/200/200?random=1",
    bio: "Visionary leader with 15+ years of experience in digital transformation."
  },
  {
    name: "Maya Rodriguez",
    role: "Creative Director",
    image: "https://picsum.photos/200/200?random=2",
    bio: "Award-winning designer passionate about creating memorable user experiences."
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "https://picsum.photos/200/200?random=3",
    bio: "Full-stack engineer specialized in building scalable, efficient applications."
  },
  {
    name: "Sarah Williams",
    role: "Marketing Strategist",
    image: "https://picsum.photos/200/200?random=4",
    bio: "Data-driven marketer with a knack for connecting brands with their audience."
  }
];

export default function AboutPage() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      {/* Hero section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          About Nexora
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Building tomorrow's digital experiences, today.
        </motion.p>
      </div>

      {/* Company story section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Team photo placeholder with animation */}
          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
            variants={itemVariants}
          >
            <Image
              src="https://picsum.photos/800/800?random=10"
              alt="Nexora Team"
              fill
              style={{ objectFit: 'cover' }}
              className="mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/70 to-blue-900/30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold">Our Team</h3>
              <p className="text-white/80">Passionate experts committed to excellence</p>
            </div>
          </motion.div>

          {/* Right: Company story */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2019, Nexora Digital began with a simple mission: to bridge the gap between complex technology and human experiences. What started as a small team of three passionate developers has grown into a full-service digital agency serving clients worldwide.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that technology should empower, not complicate. Our approach combines technical expertise with creative thinking to deliver solutions that not only work flawlessly but also delight users at every interaction.
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-8">
              To transform ideas into impactful digital experiences that drive business growth and create meaningful connections with users.
            </p>
            
            {/* Company values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {companyValues.map((value, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="mt-1">{value.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team members section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team brings together expertise from various backgrounds to create exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden h-full">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated SVG background section */}
      <div className="py-20 px-4 relative overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <Link href="/contact" passHref>
              <Button 
                size="lg" 
                className="bg-white text-purple-900 hover:bg-gray-100 font-semibold"
              >
                Get in Touch <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Animated SVG circles */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
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
            className="absolute top-20 right-10 w-60 h-60 bg-indigo-300 rounded-full"
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
            className="absolute bottom-10 left-1/4 w-40 h-40 bg-blue-300 rounded-full"
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
      </div>

      {/* Call to action */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Partner with us to transform your ideas into reality. Let's create digital experiences that stand out and drive results.
          </p>
          <Link href="/contact" passHref>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              Contact Us <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 