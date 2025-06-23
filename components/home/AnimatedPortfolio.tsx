'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// Define project interface
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  color: string;
  height: string;
  results?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Local Saree Shop Social Media Growth',
    category: 'Digital Marketing',
    image: '/nexora_notion_site/Nexora Portfolio_files/Screenshot_2025-06-20_145616.png',
    description: 'Helped a local saree shopkeeper grow his social media presence and increase sales through strategic content creation',
    technologies: ['Social Media Strategy', 'Content Marketing', 'Video Marketing'],
    color: 'from-green-600 to-teal-600',
    height: 'h-80',
    results: 'Increased online sales by 150%, improved brand visibility'
  },
  {
    id: 2,
    title: 'YouTube Channel Growth Strategy',
    category: 'Digital Marketing',
    image: '/nexora_notion_site/Nexora Portfolio_files/Screenshot_2025-06-18_153012.png',
    description: 'YouTube channel optimization showing dramatic before and after growth for client monetization and sales',
    technologies: ['YouTube Optimization', 'Analytics', 'Content Strategy'],
    color: 'from-green-600 to-teal-600',
    height: 'h-80',
    results: 'Significant subscriber growth, improved monetization'
  },
  {
    id: 3,
    title: 'Google My Business Optimization',
    category: 'GMB Optimization & Local SEO',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032364.png',
    description: 'GMB profile optimization with excellent ratings to rank above competition - achieved results within one week',
    technologies: ['GMB Optimization', 'Local SEO', 'Review Management'],
    color: 'from-blue-600 to-purple-600',
    height: 'h-80',
    results: 'Top local ranking achieved in 1 week, improved customer trust'
  },
  {
    id: 4,
    title: 'Local Business SEO Success',
    category: 'GMB Optimization & Local SEO',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032369.png',
    description: 'Complete website SEO and Google My Business optimization to achieve top local rankings',
    technologies: ['Website SEO', 'Local SEO', 'GMB Optimization'],
    color: 'from-blue-600 to-purple-600',
    height: 'h-80',
    results: 'Achieved top local search rankings, increased organic traffic'
  },
  {
    id: 5,
    title: 'Google Ads Campaign Success',
    category: 'Paid Advertising',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032358.png',
    description: 'Google Ads campaign optimization that improved brand visibility and significantly boosted product sales',
    technologies: ['Google Ads', 'Campaign Optimization', 'Performance Analytics'],
    color: 'from-purple-600 to-pink-600',
    height: 'h-80',
    results: 'Improved brand visibility, significant sales increase'
  },
  {
    id: 6,
    title: 'Online Course Platform',
    category: 'Web Development',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032361.jpg',
    description: 'Custom e-learning website with online payment integration for course sales and student management',
    technologies: ['Next.js', 'Payment Integration', 'LMS Features'],
    color: 'from-blue-600 to-cyan-600',
    height: 'h-80',
    results: 'Streamlined course sales, improved student experience'
  },
  {
    id: 7,
    title: 'Blog Website Dashboard',
    category: 'Web Development',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032363.png',
    description: 'Professional blog website with comprehensive dashboard for content management and analytics',
    technologies: ['Content Management', 'Dashboard UI', 'Analytics'],
    color: 'from-blue-600 to-cyan-600',
    height: 'h-80',
    results: 'Enhanced content management, better user engagement'
  },
  {
    id: 8,
    title: 'Gaming PC Landing Page',
    category: 'Web Development',
    image: '/nexora_notion_site/Nexora Portfolio_files/1000032362.jpg',
    description: 'High-converting landing page designed for gaming PC sales with optimized user experience',
    technologies: ['Landing Page Design', 'Conversion Optimization', 'Responsive Design'],
    color: 'from-blue-600 to-cyan-600',
    height: 'h-80',
    results: 'Optimized conversion rates, professional presentation'
  }
];

const categories = ['All', 'GMB Optimization & Local SEO', 'Digital Marketing', 'Paid Advertising', 'Web Development'];

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
    <section id="portfolio" className="py-20 relative overflow-hidden">
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
                    
                    {/* Results */}
                    {project.results && (
                      <div className="mt-3 px-3 py-1 bg-white/30 backdrop-blur-sm rounded-lg">
                        <p className="text-xs font-semibold text-white">{project.results}</p>
                      </div>
                    )}
                    
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


                  </div>
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
