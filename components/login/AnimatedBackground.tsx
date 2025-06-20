'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Only show particles after a delay and if motion is not reduced
    if (prefersReducedMotion) return;
    
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();

    const particles: Particle[] = [];
    // Reduced particle count for better performance
    const particleCount = window.innerWidth > 768 ? 12 : 6;
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5; // Smaller particles
        this.speedX = (Math.random() - 0.5) * 0.4; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x <= 0 || this.x >= canvas!.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas!.height) this.speedY *= -1;
        
        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas!.width, this.x));
        this.y = Math.max(0, Math.min(canvas!.height, this.y));
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx!.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS
    const frameInterval = 1000 / targetFPS;

    // Simplified animation loop with FPS limiting
    function animate(currentTime: number) {
      if (currentTime - lastTime >= frameInterval) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // Throttled resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isVisible, prefersReducedMotion]);

  // Static background for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
    );
  }

  return (
    <>
      {/* Canvas for particles - only show when visible */}
      {isVisible && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 -z-10 opacity-30"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Simplified gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-indigo-900/10"
      />

      {/* Static geometric shapes for visual interest */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[60px]"
        />
        
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px]"
        />
      </div>
    </>
  );
} 