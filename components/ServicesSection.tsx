'use client';

import { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code, Paintbrush, Smartphone, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionDivider from './SectionDivider';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  learnMoreLink?: string;
}

const ServiceCard = ({ title, description, icon, index, learnMoreLink = "#" }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  
  const background = useMotionTemplate`radial-gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    rgba(var(--primary-rgb), 0.06) 0%,
    rgba(var(--primary-rgb), 0) 80%
  )`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15, // Slightly increased delay for more pronounced stagger
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
      onMouseMove={handleMouseMove}
    >
      <Card className={`h-full relative overflow-hidden transition-shadow duration-300 ${isHovered ? 'shadow-xl' : 'shadow-md'}`}>
        {/* Spotlight effect */}
        <motion.div 
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300" 
          style={{ background, opacity: isHovered ? 1 : 0 }}
        />
        
        <CardHeader>
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 relative overflow-hidden">
            <motion.div
              initial={{ scale: 1 }}
              animate={isHovered ? { 
                rotate: 360,
                scale: [1, 1.2, 1]
              } : { 
                rotate: 0,
                scale: 1
              }}
              transition={{ 
                rotate: { duration: 0.5 },
                scale: { duration: 0.5, times: [0, 0.5, 1] }
              }}
              className="text-primary relative z-10"
            >
              {icon}
            </motion.div>
            
            {/* Icon background animation */}
            <motion.div 
              className="absolute inset-0 bg-primary/5"
              animate={isHovered ? {
                boxShadow: "inset 0 0 20px rgba(var(--primary-rgb), 0.4)"
              } : {
                boxShadow: "inset 0 0 0px rgba(var(--primary-rgb), 0)"
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button variant="outline" size="sm" className="mt-2 group">
              Learn More
              <motion.span
                initial={{ x: 0, opacity: 0.5 }}
                animate={isHovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.5 }}
                transition={{ duration: 0.2 }}
                className="ml-2 inline-block"
              >
                <ArrowRight size={16} />
              </motion.span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "We build responsive and performant websites using modern technologies like React, Next.js, and TypeScript that drive business growth.",
      icon: <Code size={28} />,
      learnMoreLink: "#web-development"
    },
    {
      title: "UI/UX Design",
      description: "Our design team creates beautiful, intuitive interfaces that enhance user experience and align with your brand identity.",
      icon: <Paintbrush size={28} />,
      learnMoreLink: "#design"
    },
    {
      title: "Mobile Development",
      description: "We develop cross-platform mobile applications that provide native-like experiences for both iOS and Android users.",
      icon: <Smartphone size={28} />,
      learnMoreLink: "#mobile"
    }
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/25 relative">
      {/* Top wave divider */}
      <SectionDivider type="top" color="fill-muted/25" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium mb-2 inline-block">WHAT WE OFFER</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg">
            We offer a wide range of digital services to help your business grow and succeed in the digital landscape.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              learnMoreLink={service.learnMoreLink}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Bottom wave divider */}
      <SectionDivider type="bottom" color="fill-background" />
    </section>
  );
} 