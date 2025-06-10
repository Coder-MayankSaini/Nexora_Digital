# Scroll Animations Implementation Guide

This guide documents the comprehensive scroll animation system implemented using Intersection Observer API, Framer Motion's useScroll hook, and custom easing functions with expo.inOut.

## 🚀 Features Implemented

### 1. **Intersection Observer Hook** (`hooks/useIntersectionObserver.ts`)
- **Single Element Observer**: Track when elements enter/exit viewport
- **Multiple Elements Observer**: Handle arrays of elements with individual triggers
- **Configurable Options**: Threshold, root margin, trigger once behavior
- **Performance Optimized**: Automatic cleanup and memory management

### 2. **Scroll Animation Hook** (`hooks/useScrollAnimation.ts`)
- **useScrollAnimation**: Main hook with Framer Motion's useScroll
- **useScrollTrigger**: Custom range-based animations
- **useParallax**: Smooth parallax effects with spring physics
- **useStaggeredReveal**: Sequential element animations
- **useTextReveal**: Word/letter-by-letter text animations
- **useMorphAnimation**: Shape morphing based on scroll
- **useImageReveal**: Directional image clip-path reveals
- **useSmoothScroll**: Programmatic smooth scrolling

### 3. **Custom Easing Functions** (`lib/easing.ts`)
- **Exponential**: `expo.in`, `expo.out`, `expo.inOut` (featured)
- **Cubic**: Smooth acceleration curves
- **Quartic**: More pronounced curves
- **Quintic**: Extreme curves for dramatic effects
- **Sine**: Natural, wave-like motion
- **Circular**: Sharp acceleration/deceleration
- **Back**: Overshoot effects for playful animations
- **Elastic**: Bouncy, spring-like motion
- **Bounce**: Realistic bounce physics
- **Utility Functions**: interpolate, clamp, mapRange

### 4. **Animation Components**

#### **ScrollReveal** (`components/animations/ScrollReveal.tsx`)
```tsx
import ScrollReveal, { FadeIn, SlideUp, SlideLeft, SlideRight } from '@/components/animations/ScrollReveal';

// Basic usage
<ScrollReveal direction="up" delay={0.2} duration={0.8}>
  <h1>Animated Title</h1>
</ScrollReveal>

// Specialized components
<FadeIn delay={0.5}>
  <p>Fades in from opacity 0</p>
</FadeIn>

<SlideUp distance={100} easing="back">
  <div>Slides up with back easing</div>
</SlideUp>
```

#### **ScrollParallax** (`components/animations/ScrollParallax.tsx`)
```tsx
import ScrollParallax, { ParallaxImage, ParallaxText, LayeredParallax } from '@/components/animations/ScrollParallax';

// Basic parallax
<ScrollParallax strength={50} direction="vertical">
  <div>Moves with scroll</div>
</ScrollParallax>

// Parallax image with auto-scaling
<ParallaxImage 
  src="image.jpg" 
  alt="Description"
  strength={30}
/>

// Multi-layer parallax for depth
<LayeredParallax layers={[10, 30, 50]}>
  <div>Background layer</div>
  <div>Middle layer</div>
  <div>Foreground layer</div>
</LayeredParallax>
```

#### **StaggerReveal** (`components/animations/StaggerReveal.tsx`)
```tsx
import StaggerReveal, { StaggerText, StaggerCards, StaggerGrid } from '@/components/animations/StaggerReveal';

// Sequential animation of children
<StaggerReveal staggerDelay={0.1} direction="up">
  <div>First item</div>
  <div>Second item (0.1s later)</div>
  <div>Third item (0.2s later)</div>
</StaggerReveal>

// Word-by-word text reveal
<StaggerText 
  text="Animate each word individually"
  by="word"
  staggerDelay={0.1}
/>

// Card grid with hover effects
<StaggerCards columns={3}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</StaggerCards>
```

## 🎨 Usage Examples

### Hero Section Animation
```tsx
<section className="hero">
  <SlideUp delay={0.2} duration={1.2} distance={80}>
    <h1>
      <StaggerText 
        text="Your Brand Name"
        by="letter"
        staggerDelay={0.1}
      />
    </h1>
  </SlideUp>
  
  <FadeIn delay={0.8}>
    <p>Your compelling subtitle</p>
  </FadeIn>
  
  <SlideLeft delay={1.2}>
    <button>Get Started</button>
  </SlideLeft>
</section>
```

### Parallax Background
```tsx
<section className="relative">
  <ScrollParallax strength={-30} className="absolute inset-0">
    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
  </ScrollParallax>
  
  <div className="relative z-10">
    <h2>Content over parallax background</h2>
  </div>
</section>
```

### Services Grid with Stagger
```tsx
<StaggerCards columns={3} staggerDelay={0.15}>
  {services.map((service, index) => (
    <div key={index} className="service-card">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  ))}
</StaggerCards>
```

## ⚙️ Configuration Options

### ScrollReveal Props
```tsx
interface ScrollRevealProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;          // Animation delay in seconds
  duration?: number;       // Animation duration in seconds
  distance?: number;       // Movement distance in pixels
  easing?: 'expo' | 'cubic' | 'back' | 'elastic';
  threshold?: number;      // Intersection threshold (0-1)
  triggerOnce?: boolean;   // Animate only once
}
```

### ScrollParallax Props
```tsx
interface ScrollParallaxProps {
  strength?: number;       // Parallax strength (pixels per scroll)
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;       // Reverse scroll direction
}
```

### StaggerReveal Props
```tsx
interface StaggerRevealProps {
  staggerDelay?: number;   // Delay between items
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;       // Movement distance
  easing?: string;         // Easing function name
}
```

## 🔧 Advanced Usage

### Custom Scroll Triggers
```tsx
import { useScrollTrigger } from '@/hooks/useScrollAnimation';

function CustomAnimation() {
  const { ref, value } = useScrollTrigger(
    [0, 0.5, 1],      // Input range
    [0, 100, 200],    // Output range
    { 
      offset: ["start end", "end start"],
      spring: { stiffness: 100, damping: 30 }
    }
  );

  return (
    <motion.div 
      ref={ref}
      style={{ x: value }}
    >
      Custom animated element
    </motion.div>
  );
}
```

### Image Reveal Animations
```tsx
import { useImageReveal } from '@/hooks/useScrollAnimation';

function RevealImage() {
  const { ref, clipPath, scale } = useImageReveal('up');
  
  return (
    <motion.img
      ref={ref}
      style={{ clipPath, scale }}
      src="image.jpg"
      alt="Revealed image"
    />
  );
}
```

### Text Reveal Effects
```tsx
import { useTextReveal } from '@/hooks/useScrollAnimation';

function RevealText() {
  const { ref, transforms } = useTextReveal();
  
  return (
    <motion.h2
      ref={ref}
      style={transforms}
    >
      Text that reveals on scroll
    </motion.h2>
  );
}
```

## 🎯 Performance Considerations

### Optimization Tips
1. **Use `triggerOnce: true`** for animations that should only happen once
2. **Adjust `threshold`** values to trigger animations at the right time
3. **Use `transform-gpu`** class for hardware acceleration
4. **Limit simultaneous animations** to maintain 60fps
5. **Use `rootMargin`** to trigger animations before elements are visible

### Memory Management
- All observers are automatically cleaned up on component unmount
- Spring animations use Framer Motion's optimized physics
- Intersection Observer entries are properly dereferenced

## 🌟 Best Practices

### Animation Timing
```tsx
// Good: Staggered timing creates hierarchy
<SlideUp delay={0.2}>Title</SlideUp>
<FadeIn delay={0.4}>Subtitle</FadeIn>
<SlideLeft delay={0.6}>Button</SlideLeft>

// Avoid: All animations starting simultaneously
```

### Easing Selection
- **expo.inOut**: Best for dramatic, attention-grabbing animations
- **cubic.inOut**: Natural, everyday animations
- **back.inOut**: Playful, bouncy interactions
- **elastic.inOut**: Attention-grabbing, fun elements

### Accessibility
```tsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<ScrollReveal 
  duration={prefersReducedMotion ? 0 : 0.8}
  distance={prefersReducedMotion ? 0 : 50}
>
  Content
</ScrollReveal>
```

## 📱 Mobile Optimization

### Touch-Friendly Animations
- Reduced animation distances on mobile
- Faster animation durations for touch interfaces
- Simplified parallax effects to maintain performance

### Responsive Timing
```tsx
const isMobile = window.innerWidth < 768;

<StaggerReveal 
  staggerDelay={isMobile ? 0.05 : 0.1}
  duration={isMobile ? 0.4 : 0.6}
>
  {items}
</StaggerReveal>
```

## 🔍 Debugging

### Animation States
Use browser dev tools to inspect:
- Intersection Observer entries
- Framer Motion transform values
- Spring physics parameters
- Performance metrics

### Common Issues
1. **Animations not triggering**: Check threshold and rootMargin values
2. **Jerky animations**: Reduce spring stiffness or add damping
3. **Performance issues**: Limit concurrent animations and use will-change CSS
4. **Mobile problems**: Test on actual devices, not just browser DevTools

---

The scroll animation system provides a comprehensive toolkit for creating engaging, performant animations that enhance user experience while maintaining accessibility and performance standards. All animations use the custom `expo.inOut` easing function for consistent, dramatic timing curves throughout the application. 