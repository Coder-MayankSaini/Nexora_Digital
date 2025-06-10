'use client';

import Header from '@/components/Header';
import ScrollIndicator from '@/components/ScrollIndicator';
import ServicesSection from '@/components/ServicesSection';
import PortfolioGrid from '@/components/PortfolioGrid';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Nexora
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
              Building the future with innovative web solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <ScrollIndicator targetId="about-section" />
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Crafting Digital Excellence
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We combine cutting-edge technology with creative design to deliver 
                  web experiences that not only look stunning but perform exceptionally. 
                  Our passion for innovation drives every project we undertake.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                    <div className="text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=10" 
                  alt="About Us"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold text-purple-600">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Services Section */}
        <section className="relative">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 absolute inset-0"></div>
          <div className="relative z-10">
            <ServicesSection />
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Our Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our portfolio of successful projects that showcase our 
                commitment to excellence and innovation.
              </p>
            </div>
            <PortfolioGrid />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                What Clients Say
              </h2>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Nexora transformed our digital presence completely. The results exceeded our expectations.",
                  author: "Sarah Johnson",
                  company: "TechStart Inc."
                },
                {
                  quote: "Professional, innovative, and reliable. Working with Nexora was a game-changer for our business.",
                  author: "Michael Chen",
                  company: "Design Co."
                },
                {
                  quote: "The attention to detail and creative solutions provided by Nexora are unmatched.",
                  author: "Emily Rodriguez",
                  company: "Creative Agency"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center"
                >
                  <div className="text-4xl text-purple-300 mb-4">"</div>
                  <p className="text-white mb-6 italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="text-purple-200">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm opacity-75">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Let's work together to bring your vision to life with cutting-edge 
              web solutions that drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Start Your Project
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 