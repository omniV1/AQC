import React from 'react';

export default function AboutSection() {
  return (
    <section className="bg-soft-rose/30 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-4xl text-warm-brown text-center mb-12">
          About Me
        </h2>
        
        <div className="space-y-8 font-body text-lg text-warm-brown/80 max-w-readable mx-auto">
          <p className="leading-relaxed">
            I became passionate about postpartum care through my own experiences 
            of navigating birth and the postpartum season three times.
          </p>
          
          <p className="leading-relaxed">
            Currently pursuing certification as a postpartum doula through DONA 
            International, I now offer non-clinical support to families in West Valley.
          </p>
          
          <p className="leading-relaxed">
            My focus is on holistic, intuitive, and sustainable care. I believe everyone 
            deserves to feel nurtured and supported in early parenthood.
          </p>

          
        </div>
      </div>
    </section>
  );
} 