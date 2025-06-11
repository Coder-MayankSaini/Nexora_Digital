'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Modern online shopping experience with AI recommendations',
    technologies: ['Next.js', 'TypeScript', 'Stripe'],
    color: 'from-purple-600 to-blue-600',
    height: 'h-64',
  },
  {
    id: 2,
    title: 'Financial Dashboard',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/400/500?random=2',
    description: 'Real-time analytics dashboard for financial data',
    technologies: ['React', 'D3.js', 'TailwindCSS'],
    color: 'from-blue-600 to-cyan-600',
    height: 'h-96',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Secure banking app with biometric authentication',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    color: 'from-green-600 to-teal-600',
    height: 'h-80',
  },
  {
    id: 4,
    title: 'SaaS Platform',
    category: 'Full Stack',
    image: 'https://picsum.photos/400/350?random=4',
    description: 'Complete SaaS solution for project management',
    technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
    color: 'from-pink-600 to-purple-600',
    height: 'h-72',
  },
  {
    id: 5,
    title: 'Healthcare Portal',
    category: 'Web Development',
    image: 'https://picsum.photos/400/450?random=5',
    description: 'Patient management system with telemedicine features',
    technologies: ['Angular', 'Express', 'MySQL'],
    color: 'from-orange-600 to-red-600',
    height: 'h-88',
  },
  {
    id: 6,
    title: 'AI Content Creator',
    category: 'AI/ML',
    image: 'https://picsum.photos/400/320?random=6',
    description: 'AI-powered content generation platform',
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    color: 'from-indigo-600 to-purple-600',
    height: 'h-68',
  },
];

const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile Development', 'Full Stack', 'AI/ML'];

export default function AnimatedPortfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest projects and see how we bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid - Masonry Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={cn("relative group cursor-pointer", project.height)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-full rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: hoveredProject === project.id ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient Overlay */}
                <motion.div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-90 transition-opacity duration-300",
                    project.color
                  )}
                />

                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    y: hoveredProject === project.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-6 flex flex-col justify-end text-white"
                >
                  <div className="space-y-3">
                    <p className="text-sm font-medium opacity-90">{project.category}</p>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Corner Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    scale: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-lg">→</span>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              {hoveredProject === project.id && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (i - 1) * 50],
                        y: [0, -50 - i * 20],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      style={{
                        left: '50%',
                        bottom: '10%',
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
