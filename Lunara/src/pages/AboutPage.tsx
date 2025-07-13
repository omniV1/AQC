import React from 'react';
import AboutSection from '../components/sections/AboutSection';
import Header from '../components/layout/Header';

export default function AboutPage() {
  return (
    <div className="w-full bg-cream flex flex-col items-center">
      {/* Header overlay */}
      <Header />
      {/* Basket Hero Section – tucked under header, like LandingPage */}
      <div className="relative w-full h-[580px] -mt-[50px] max-w-[1076px] mx-auto flex justify-center items-center">
        {/* Basket Background Image */}
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: `url('/images/basket.png')`,
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Overlay Heading */}
        <h1
          className="absolute inset-0 flex items-center justify-center text-white text-9xl md:text-7xl font-script tracking-wide drop-shadow-md transform translate-y-9"
          style={{ WebkitTextStroke: '1px rgba(87, 32, 3, 0.35)', letterSpacing: '0.07em' }}
        >
          Our Philosophy
        </h1>
        {/* Othala Icon - larger, no brown border */}
        <div
          className="absolute left-1/2 -bottom-16 transform -translate-x-1/2 z-20 bg-white rounded-full shadow-lg flex items-center justify-center"
          style={{ width: '120px', height: '120px' }}
        >
          <img
            src="/images/othala.png"
            alt="Othala Rune"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>
      {/* About Section */}
      <div className="w-full flex justify-center mt-12">
        <AboutSection />
      </div>
    </div>
  );
} 