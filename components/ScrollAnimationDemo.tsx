'use client';

import React from 'react';
import ScrollReveal, { FadeIn, SlideUp, SlideLeft, SlideRight } from '@/components/animations/ScrollReveal';
import ScrollParallax, { ParallaxText, LayeredParallax } from '@/components/animations/ScrollParallax';
import StaggerReveal, { StaggerText, StaggerCards } from '@/components/animations/StaggerReveal';

export default function ScrollAnimationDemo() {
  return (
    <div className="min-h-screen space-y-20 p-8">
      {/* Hero Section Demo */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden">
        {/* Parallax Background */}
        <ScrollParallax strength={-20} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        </ScrollParallax>

        {/* Floating Elements */}
        <ScrollParallax strength={15} className="absolute top-10 left-10 w-32 h-32">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl w-full h-full"></div>
        </ScrollParallax>
        <ScrollParallax strength={-10} className="absolute bottom-10 right-10 w-48 h-48">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl w-full h-full"></div>
        </ScrollParallax>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Animated Title */}
          <SlideUp delay={0.2} duration={1} distance={60}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              <StaggerText
                text="Scroll Animations"
                by="letter"
                staggerDelay={0.1}
                className="inline-block"
              />
            </h1>
          </SlideUp>

          {/* Animated Subtitle */}
          <FadeIn delay={0.8} duration={1}>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              <StaggerText
                text="Powered by Intersection Observer and Framer Motion"
                by="word"
                staggerDelay={0.05}
              />
            </div>
          </FadeIn>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SlideLeft delay={1.2} duration={0.8}>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                Explore Animations
              </button>
            </SlideLeft>
            <SlideRight delay={1.4} duration={0.8}>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* Parallax Text Demo */}
      <section className="py-20 bg-white rounded-2xl relative overflow-hidden">
        <ScrollParallax strength={10} className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-purple-100 to-blue-100"></div>
        </ScrollParallax>
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              Parallax Effects
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <ParallaxText strength={15} className="text-6xl font-bold text-purple-600/20 select-none">
                PARALLAX
              </ParallaxText>
              <ScrollReveal direction="left" delay={0.4}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Elements move at different speeds creating depth and immersion. 
                  The text behind moves slower than the content, creating a 
                  beautiful layered effect.
                </p>
              </ScrollReveal>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl overflow-hidden">
              <ScrollParallax strength={25} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-tr from-purple-500/30 to-blue-500/30 transform scale-110"></div>
              </ScrollParallax>
              <div className="absolute inset-0 flex items-center justify-center">
                <ScrollReveal direction="fade" delay={0.6}>
                  <div className="text-2xl font-bold text-white text-center">
                    Parallax Layer
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stagger Animation Demo */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
        <div className="container mx-auto px-6">
          <SlideUp delay={0.2} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stagger Animations
            </h2>
            <p className="text-xl text-gray-600">
              Elements animate in sequence for dramatic effect
            </p>
          </SlideUp>

          <StaggerCards columns={3} staggerDelay={0.1}>
            {[
              {
                title: "Intersection Observer",
                description: "Efficient viewport detection with configurable thresholds and margins",
                icon: "👁️"
              },
              {
                title: "Framer Motion",
                description: "Smooth spring physics and scroll-based animations",
                icon: "🎬"
              },
              {
                title: "Custom Easing",
                description: "expo.inOut and other curves for dramatic timing",
                icon: "📈"
              },
              {
                title: "Performance",
                description: "Hardware accelerated with automatic cleanup",
                icon: "⚡"
              },
              {
                title: "Accessibility",
                description: "Respects reduced motion preferences",
                icon: "♿"
              },
              {
                title: "Mobile Ready",
                description: "Optimized for touch devices and small screens",
                icon: "📱"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggerCards>
        </div>
      </section>

      {/* Text Reveal Demo */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl relative overflow-hidden">
        <LayeredParallax layers={[5, 15, 25]}>
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </LayeredParallax>

        <div className="container mx-auto px-6 text-center relative z-10">
          <SlideUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              <StaggerText
                text="Beautiful Typography"
                by="word"
                staggerDelay={0.1}
              />
            </h2>
          </SlideUp>
          
          <FadeIn delay={0.8}>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              <StaggerText
                text="Text animations that reveal letter by letter or word by word, creating engaging reading experiences that capture attention and guide the eye through your content naturally."
                by="word"
                staggerDelay={0.03}
              />
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={1.2}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5+</div>
                <div className="text-purple-200">Animation Types</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={1.4}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10+</div>
                <div className="text-purple-200">Easing Functions</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={1.6}>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-purple-200">Creative Possibilities</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white rounded-2xl text-center">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Implement?
          </h2>
        </ScrollReveal>
        
        <FadeIn delay={0.4}>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            All components are ready to use with TypeScript support, 
            comprehensive documentation, and performance optimizations.
          </p>
        </FadeIn>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SlideLeft delay={0.6}>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              View Components
            </button>
          </SlideLeft>
          <SlideRight delay={0.8}>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300">
              Read Documentation
            </button>
          </SlideRight>
        </div>
      </section>
    </div>
  );
} 