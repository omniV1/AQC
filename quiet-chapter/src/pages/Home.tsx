import React from 'react';
import Hero from '../components/sections/Hero'; // Uncommented
import ServicesOverview from '../components/sections/ServicesOverview'; // Uncommented

export default function Home() {
  return (
    // Removed flex container, sections handle their own spacing/alignment
    <main>
      <Hero 
        title="The Quiet Chapter" 
        subtitle="Gentle postpartum support for West Valley families" 
      />
      
      <ServicesOverview />

      {/* Add Testimonials and CTA sections later */}
      <div className="text-center p-10 border border-dashed border-gray-400 mt-16">
        Placeholder for Testimonials Section
      </div>
      <div className="text-center p-10 border border-dashed border-gray-400 mt-16">
        Placeholder for CTA Section
      </div>
    </main>
  );
} 