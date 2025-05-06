import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-cream py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Logo container */}
        <div className="mb-12">
          <img 
            src="/images/logo.jpeg"
            alt="Lunara Logo" 
            className="w-[400px] h-auto mx-auto"
          />
        </div>

        {/* Text content */}
        <h2 className="font-heading text-3xl text-warm-brown mb-8">
          {subtitle}
        </h2>
        
        <p className="font-body text-lg text-warm-brown/80 max-w-readable mx-auto mb-12 leading-relaxed">
          I'm a mother of three based in Litchfield Park, currently working toward 
          postpartum doula certification through DONA International. I offer 
          compassionate, non-clinical support for new parents—focused on 
          emotional care, newborn soothing, light household help, and 
          holistic resource-sharing.
        </p>

        <Link 
          to="/services" 
          className="inline-block bg-sage hover:bg-sage/90 text-cream font-body 
                     px-8 py-3 rounded-lg shadow-md hover:shadow-lg 
                     transform hover:-translate-y-1 transition-all duration-300"
        >
          Explore services
        </Link>
      </div>
    </section>
  );
} 