import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-cream">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/50"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src="/images/logo.png"
            alt="Lunara Logo" 
            className="w-[300px] h-auto mx-auto"
          />
        </div>

        {/* Main content */}
        <h1 className="sr-only">{title}</h1>
        <h2 className="font-heading text-3xl md:text-4xl text-warm-brown mb-6">
          {subtitle}
        </h2>
        
        <p className="font-body text-lg text-warm-brown/80 max-w-readable mx-auto mb-12 leading-relaxed">
          Care that honors the sacred rhythms of birth, rest, and renewal.
          We provide gentle, compassionate postpartum support for families in the
          West Valley, believing the transition into parenthood deserves nurturing care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/services" 
            className="px-8 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            Explore Services
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-3 border-2 border-sage text-sage rounded-lg 
                     hover:bg-sage hover:text-white transform hover:-translate-y-1 
                     transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 bottom-0 w-40 h-40 bg-leaf-texture opacity-20 transform -translate-x-1/2"></div>
        <div className="absolute right-0 top-0 w-40 h-40 bg-leaf-texture opacity-20 transform translate-x-1/2 rotate-180"></div>
      </div>
    </section>
  );
} 