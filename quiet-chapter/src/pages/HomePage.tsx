import React from 'react';

export default function HomePage() {
  return (
    <div className="w-full bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <img 
            src="/images/logo.png" 
            alt="The Quiet Chapter Logo" 
            className="w-64 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-brown">
            The Quiet Chapter
          </h1>
          <p className="text-lg text-brown/80 italic mt-2">
            Tender support for the story unfolding
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="text-center">
            <h2 className="text-2xl font-serif text-brown mb-4">
              Gentle postpartum support for West Valley families
            </h2>
            <p className="text-brown/90 leading-relaxed">
              I'm a mother of three based in Litchfield Park, currently working toward 
              postpartum doula certification through DONA International. I offer 
              compassionate, non-clinical support for new parents—focused on 
              emotional care, newborn soothing, light household help, and 
              holistic resource-sharing.
            </p>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <a 
              href="/services" 
              className="inline-block bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300"
            >
              Explore services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 