import React from 'react';
import AboutSection from '../components/sections/AboutSection';
// import aboutImage from '../assets/images/your-image.jpg'; // Optional: Add an image

export default function AboutPage() {
  return (
    <div className="w-full bg-cream">
      {/* Logo Section */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8 text-center">
        <img 
          src="/images/logo.png"
          alt="Lunara Logo" 
          className="w-64 mx-auto mb-6"
        />
        <p className="text-lg text-brown/80 italic mt-2">
          Care that honors the sacred rhythms of birth, rest, and renewal.
        </p>
      </div>

      {/* About Section */}
      <AboutSection />
    </div>
  );
} 