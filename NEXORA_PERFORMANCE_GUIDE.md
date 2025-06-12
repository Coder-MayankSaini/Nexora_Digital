# Nexora Website Performance Optimization Guide

This guide outlines the performance optimization strategies implemented in the Nexora Digital website, along with best practices for maintaining and improving website performance.

## Table of Contents

1. [Image Optimization](#image-optimization)
2. [Animation Performance](#animation-performance)
3. [Code Splitting and Lazy Loading](#code-splitting-and-lazy-loading)
4. [Font Optimization](#font-optimization)
5. [CDN and Caching Strategies](#cdn-and-caching-strategies)
6. [Performance Monitoring](#performance-monitoring)
7. [SVG Usage](#svg-usage)
8. [Third-Party Scripts](#third-party-scripts)

## Image Optimization

### Next.js Image Component

Always use the custom `OptimizedImage` component which wraps Next.js's `<Image>` component:

```jsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage 
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  revealOnScroll={true}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Key benefits:
- Automatic WebP/AVIF format conversion
- Responsive sizing
- Lazy loading
- Blur-up placeholders
- Proper aspect ratio
- Fade-in animations

### Image Compression

Before adding images to the project:
1. Compress with tools like [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
2. Consider using AVIF format for 30-50% smaller files than WebP
3. Resize images to match their display size
4. Use SVGs for icons and simple illustrations

## Animation Performance

### Framer Motion Performance Guidelines

1. **Use hardware-accelerated properties**:
   - `transform` (translate, scale, rotate)
   - `opacity`
   - Avoid animating `width`, `height`, `top`, `left`, etc.

2. **Conditionally render animations**:
   - Use `useReducedMotion` hook for accessibility
   - Only animate when in viewport with `whileInView`

3. **Add willChange hints**:
   ```jsx
   <motion.div
     style={{ willChange: 'transform' }}
     animate={{ x: 100 }}
   />
   ```

4. **Limit animated elements**:
   - Focus on key elements
   - Reduce number of particles/floating elements

5. **Use viewport detection**:
   ```jsx
   <motion.div
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true, amount: 0.3 }}
   />
   ```

## Code Splitting and Lazy Loading

### Dynamic Imports

Use the `useInViewLoader` hook for components that are below the fold:

```jsx
import { useInViewLoader } from '@/hooks/useInViewLoader';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

function MyPage() {
  const { ref, isInView } = useInViewLoader();
  
  return (
    <div ref={ref}>
      {isInView && <LazyComponent />}
    </div>
  );
}
```

### Route-Based Code Splitting

Next.js automatically code-splits at the page level. Take advantage of this by:
- Keeping pages small and focused
- Moving shared logic to components
- Using the app directory for more granular code splitting

## Font Optimization

### Font Loading Strategy

1. **Use variable fonts** where possible
2. **Preload critical fonts**:
   ```jsx
   // In your Layout component
   <link
     rel="preload"
     href="/fonts/Inter.var.woff2"
     as="font"
     type="font/woff2"
     crossorigin="anonymous"
   />
   ```
3. **Self-host fonts** rather than using Google Fonts CDN
4. **Limit font weights**
5. **Use system font fallbacks** while custom fonts load

### Font Display Options

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* or optional */
}
```

## CDN and Caching Strategies

### Netlify CDN Configuration

Our Netlify setup includes:
- Global CDN distribution
- Optimized cache headers in `public/_headers`
- Brotli and gzip compression
- HTTP/2 support

### Cache Headers

The website uses the following cache strategy:
- Static assets: Cache for 1 year (immutable)
- HTML: No cache or short cache
- API responses: Vary based on content type

## Performance Monitoring

### Lighthouse Audits

Run regular Lighthouse audits to catch performance regressions:
```bash
npx lighthouse https://nexora.com --view
```

Focus on:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s

### Web Vitals Monitoring

We track real user metrics with the `web-vitals` library:
```jsx
// In your _app.js or similar
import { getCLS, getFID, getLCP } from 'web-vitals';

function reportWebVitals({ id, name, value }) {
  // Send to analytics
  console.log(name, value);
}

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
```

## SVG Usage

### SVG Optimization

1. **Optimize SVGs** with [SVGO](https://github.com/svg/svgo)
2. **Use inline SVGs** for small icons
3. **Use sprite sheets** for multiple icons
4. **Lazy load decorative SVGs**

### Icon System

Prefer `lucide-react` for icons as it's tree-shakable and optimized.

## Third-Party Scripts

### Script Loading Strategy

1. **Defer non-critical scripts**:
   ```jsx
   <Script
     src="https://example.com/script.js"
     strategy="lazyOnload"
   />
   ```

2. **Self-host analytics** where possible
3. **Audit third-party impact** regularly
4. **Consider using tag managers** to control script loading

### Reducing Third-Party Impact

- Load third-party widgets only after user interaction
- Replace heavy embeds with lightweight alternatives
- Consider privacy-focused analytics alternatives

---

By following these guidelines, we ensure that the Nexora website remains fast, responsive, and provides an excellent user experience across all devices and connection speeds. 