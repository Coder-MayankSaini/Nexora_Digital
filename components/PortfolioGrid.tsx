'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionDivider from './SectionDivider';
import useWindowSize from '@/lib/useWindowSize';

// Portfolio item types
type Category = 'All' | 'Web' | 'Mobile' | 'SaaS';
interface PortfolioItem {
  id: number;
  title: string;
  category: Category[];
  imageUrl: string;
  link: string;
  width: number;
  height: number;
  span?: number; // Grid span
}

// Sample portfolio data
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Modern E-commerce Website",
    category: ["Web", "SaaS"],
    imageUrl: "https://picsum.photos/id/26/800/600",
    link: "#",
    width: 800,
    height: 600,
    span: 1
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: ["Mobile"],
    imageUrl: "https://picsum.photos/id/96/800/1200",
    link: "#",
    width: 800,
    height: 1200,
    span: 2
  },
  {
    id: 3,
    title: "Project Management SaaS",
    category: ["Web", "SaaS"],
    imageUrl: "https://picsum.photos/id/42/800/800",
    link: "#",
    width: 800,
    height: 800,
    span: 1
  },
  {
    id: 4,
    title: "Health Tracking Mobile App",
    category: ["Mobile"],
    imageUrl: "https://picsum.photos/id/64/800/1000",
    link: "#",
    width: 800,
    height: 1000,
    span: 2
  },
  {
    id: 5,
    title: "AI Content Generator",
    category: ["Web", "SaaS"],
    imageUrl: "https://picsum.photos/id/91/800/600",
    link: "#",
    width: 800,
    height: 600,
    span: 1
  },
  {
    id: 6,
    title: "Real Estate Finder App",
    category: ["Mobile", "SaaS"],
    imageUrl: "https://picsum.photos/id/239/800/900",
    link: "#",
    width: 800,
    height: 900,
    span: 2
  },
  {
    id: 7,
    title: "Portfolio Website Template",
    category: ["Web"],
    imageUrl: "https://picsum.photos/id/180/800/600",
    link: "#",
    width: 800,
    height: 600,
    span: 1
  },
  {
    id: 8,
    title: "Accounting Dashboard SaaS",
    category: ["Web", "SaaS"],
    imageUrl: "https://picsum.photos/id/106/800/700",
    link: "#",
    width: 800,
    height: 700,
    span: 1
  }
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioItems);
  const { width } = useWindowSize();
  
  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      const filtered = portfolioItems.filter(item => 
        item.category.includes(activeCategory)
      );
      setFilteredItems(filtered);
    }
  }, [activeCategory]);
  
  // Determine row span based on screen size
  const getRowSpan = (item: PortfolioItem) => {
    if (!width) return item.span || 1;
    
    // Adjust row span based on screen size
    if (width < 768) {
      // Mobile view
      return Math.ceil(item.height / (item.width / 100) / 30);
    } else if (width < 1024) {
      // Tablet view
      return Math.ceil(item.height / (item.width / 100) / 35);
    } else {
      // Desktop view
      return Math.ceil(item.height / (item.width / 100) / 40);
    }
  };
  
  return (
    <section id="portfolio" className="py-20 bg-background relative">
      {/* Top wave divider */}
      <SectionDivider type="top" color="fill-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary font-medium mb-2 inline-block">OUR WORK</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Explore our portfolio of projects across web, mobile, and SaaS platforms.
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Web', 'Mobile', 'SaaS'].map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category as Category)}
                className="min-w-20"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Masonry Portfolio Grid */}
        <div className="grid-masonry-container">
          <motion.div 
            layout
            className="grid-masonry"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="grid-masonry-item group cursor-pointer relative overflow-hidden rounded-lg shadow-md"
                  style={{ 
                    gridRow: `span ${getRowSpan(item)}`,
                    aspectRatio: item.width / item.height
                  }}
                >
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-white">
                    <motion.h3 
                      initial={{ y: 20, opacity: 0 }} 
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl font-bold mb-2 text-center"
                    >
                      {item.title}
                    </motion.h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {item.category.map(cat => (
                        <span key={cat} className="text-xs px-2 py-1 bg-primary/40 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={item.link}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1 text-sm font-medium bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                      View Project <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <SectionDivider type="bottom" color="fill-muted/25" />
    </section>
  );
} 