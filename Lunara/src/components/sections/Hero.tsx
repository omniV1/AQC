import React from 'react';
import { Link } from 'react-router-dom';
import babyImage from '../../Assets/baby ollie.png';
import leftAcorn from '../../Assets/left corn.png';
import rightAcorn from '../../Assets/right corn.png';
import lunaraLogo from '../../Assets/lunara logo.png';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Navigation Header */}
      <nav className="w-full py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={lunaraLogo} alt="Lunara" className="w-32 h-auto" />
          </div>
          <div className="flex justify-center space-x-16 mt-6">
            <a href="/about" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors text-lg">About</a>
            <a href="/faq" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors text-lg">FAQ</a>
            <a href="/blog" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors text-lg">Blog</a>
            <a href="/login" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors text-lg">Login</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section with Overlaid Text */}
        <div className="relative">
          {/* Baby Image */}
          <img
            src={babyImage}
            alt="Peaceful sleeping baby"
            className="w-full h-auto object-cover rounded-t-lg"
          />
          
          {/* Overlaid Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-playfair italic text-[#4E1B00] text-6xl md:text-7xl leading-relaxed max-w-4xl text-center">
              Rest-centered, postpartum support for all families
            </h1>
          </div>
          
          {/* Acorn Navigation */}
          <div className="flex justify-center space-x-32 -mt-16 relative z-10">
            <Link to="/services" className="transform hover:scale-105 transition-transform">
              <div className="relative">
                <img src={leftAcorn} alt="Services" className="w-48 h-48" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-serif text-2xl">
                  Services
                </span>
              </div>
            </Link>
            <Link to="/inquire" className="transform hover:scale-105 transition-transform">
              <div className="relative">
                <img src={rightAcorn} alt="Inquire" className="w-48 h-48" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-serif text-2xl">
                  Inquire
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;