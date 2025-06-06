import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="relative w-screen">
      {/* Scalloped Background */}
      <div className="absolute left-0 right-0 top-0 w-screen overflow-hidden">
        <img 
          src="/images/scallops.svg" 
          alt="Decorative scalloped background"
          className="w-full min-w-[100vw] object-cover"
          style={{ margin: '-1px' }} // Prevent any tiny gaps
        />
      </div>

      {/* Navigation Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4">
        <nav className="flex items-center justify-center h-[200px] bg-transparent">
          {/* Left Navigation Links */}
          <div className="flex items-center space-x-16 mr-16">
            <Link 
              to="/about" 
              className="text-[26px] text-[#4E1B00] font-['Luxurious_Roman'] tracking-[0.78px] [text-shadow:0px_4px_4px_rgba(255,255,255,0.27)] hover:text-[#A27B5C] transition-colors"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-[26px] text-[#4E1B00] font-['Luxurious_Roman'] tracking-[0.78px] [text-shadow:0px_4px_4px_rgba(255,255,255,0.27)] hover:text-[#A27B5C] transition-colors"
            >
              Services
            </Link>
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/images/wax%20seal.png" 
              alt="Wax Seal" 
              className="w-[142px] h-[142px] filter drop-shadow-[0_4px_38px_rgba(79,28,0,0.31)]"
            />
          </Link>

          {/* Right Navigation Links */}
          <div className="flex items-center space-x-16 ml-16">
            <Link 
              to="/blog" 
              className="text-[26px] text-[#4E1B00] font-['Luxurious_Roman'] tracking-[0.78px] [text-shadow:0px_4px_4px_rgba(255,255,255,0.27)] hover:text-[#A27B5C] transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-[26px] text-[#4E1B00] font-['Luxurious_Roman'] tracking-[0.78px] [text-shadow:0px_4px_4px_rgba(255,255,255,0.27)] hover:text-[#A27B5C] transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

