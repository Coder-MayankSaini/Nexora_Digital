'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionDivider from '@/components/SectionDivider';
import useWindowSize from '@/lib/useWindowSize';
import OptimizedImage from '@/components/ui/OptimizedImage';

// Portfolio item types
type Category = 'All' | 'Digital Marketing' | 'Local SEO' | 'Paid Ads' | 'Web Development';
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

// Real portfolio data from Nexora's actual projects
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Local Saree Shop Social Media Growth",
    category: ["Digital Marketing"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/Screenshot_2025-06-20_145616.png",
    link: "#",
    width: 600,
    height: 450,
    span: 1
  },
  {
    id: 2,
    title: "YouTube Channel Growth Strategy",
    category: ["Digital Marketing"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/Screenshot_2025-06-18_153012.png",
    link: "#",
    width: 600,
    height: 300,
    span: 1
  },
  {
    id: 3,
    title: "Google My Business Optimization",
    category: ["Local SEO"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032364.png",
    link: "#",
    width: 600,
    height: 600,
    span: 2
  },
  {
    id: 4,
    title: "Local Business SEO Success",
    category: ["Local SEO"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032369.png",
    link: "#",
    width: 600,
    height: 750,
    span: 2
  },
  {
    id: 5,
    title: "Google Ads Campaign Success",
    category: ["Paid Ads"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032358.png",
    link: "#",
    width: 600,
    height: 450,
    span: 1
  },
  {
    id: 6,
    title: "Online Course Platform",
    category: ["Web Development"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032361.jpg",
    link: "#",
    width: 600,
    height: 675,
    span: 2
  },
  {
    id: 7,
    title: "Blog Website Dashboard",
    category: ["Web Development"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032363.png",
    link: "#",
    width: 600,
    height: 450,
    span: 1
  },
  {
    id: 8,
    title: "Gaming PC Landing Page",
    category: ["Web Development"],
    imageUrl: "/nexora_notion_site/Nexora Portfolio_files/1000032362.jpg",
    link: "#",
    width: 600,
    height: 525,
    span: 1
  }
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { width } = useWindowSize();
  
  // Memoized filtered items for performance
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category.includes(activeCategory));
  }, [activeCategory]);

  // Memoized category handler
  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
  }, []);
  
  // Determine row span based on screen size - memoized
  const getRowSpan = useCallback((item: PortfolioItem) => {
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
  }, [width]);

  // Memoized grid styles for better performance
  const gridStyles = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: width && width < 768 ? '1fr' : width && width < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: '1.5rem',
    gridAutoRows: '10px',
  }), [width]);
  
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
          
          {/* Filter Tabs - Optimized with memoized handlers */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(['All', 'Digital Marketing', 'Local SEO', 'Paid Ads', 'Web Development'] as Category[]).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="min-w-20"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Optimized Masonry Portfolio Grid */}
        <div className="relative">
          <motion.div 
            layout
            style={gridStyles}
            className="auto-rows-[10px]"
          >
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  rowSpan={getRowSpan(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <SectionDivider type="bottom" color="fill-background" />
    </section>
  );
}

// Separate memoized component for portfolio cards
interface PortfolioCardProps {
  item: PortfolioItem;
  rowSpan: number;
}

const PortfolioCard = ({ item, rowSpan }: PortfolioCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Memoized card styles
  const cardStyles = useMemo(() => ({
    gridRowEnd: `span ${rowSpan}`,
    aspectRatio: `${item.width} / ${item.height}`
  }), [rowSpan, item.width, item.height]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }} // Faster transition
      className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md"
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Optimized Image */}
      <motion.div
        className="w-full h-full relative"
        whileHover={{ scale: 1.05 }} // Reduced scale for better performance
        transition={{ duration: 0.3 }}
      >
        <OptimizedImage
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={item.id <= 3} // Priority load for first 3 items
        />
      </motion.div>
      
      {/* Optimized Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }} // Faster transition
        className="absolute inset-0 bg-black/60 flex items-center justify-center"
      >
        <div className="text-center text-white p-4">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-lg font-semibold mb-2"
          >
            {item.title}
          </motion.h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {item.category.map((cat, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/20 rounded-full text-xs"
              >
                {cat}
              </span>
            ))}
          </motion.div>
          <motion.a
            href={item.link}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="inline-block mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            onClick={(e) => e.preventDefault()} // Prevent navigation for demo
          >
            View Project
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}; 