'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    
    const timer = setTimeout(() => setIsVisible(true), 2000);
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
    // Drastically reduced particle count for better performance
    const particleCount = window.innerWidth > 768 ? 15 : 8;
    let animationId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.speedX = (Math.random() - 0.5) * 0.3; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.2 + 0.05; // More subtle
        this.hue = Math.random() * 40 + 250; // Purple-blue range
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges instead of wrapping for smoother movement
        if (this.x <= 0 || this.x >= canvas!.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas!.height) this.speedY *= -1;
        
        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas!.width, this.x));
        this.y = Math.max(0, Math.min(canvas!.height, this.y));
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${this.hue}, 60%, 70%, ${this.opacity})`;
        ctx!.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let lastTime = 0;
    const targetFPS = 30; // Limit to 30 FPS instead of 60
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

  // Don't render anything if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900/5 via-purple-900/5 to-slate-900/5" />
    );
  }

  return (
    <>
      {/* Canvas for particles - only show when visible */}
      {isVisible && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 -z-10 opacity-40"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Simplified gradient backgrounds - fewer and simpler */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"
        />
        
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]"
        />
      </div>
    </>
  );
} 