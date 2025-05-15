import React from 'react';
import { Link } from 'react-router-dom';
import babyOllie from "../Assets/baby ollie.png";
import meadowBackground from "../Assets/meadow background.png";
import paper from "../Assets/paper.png";
import babyEli from "../Assets/baby eli.png";
import polaroidFrame from "../Assets/polaroid frame.png";
import leftCorn from "../Assets/left corn.png";
import rightCorn from "../Assets/right corn.png";
import lunaraLogo from "../Assets/lunara logo.png";
import beeImage from "../Assets/image 2.png";
import Footer from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="flex flex-col items-center py-8">
        <Link to="/">
          <img src={lunaraLogo} alt="Lunara" className="w-[120px] md:w-[150px] mb-8" />
        </Link>
        <nav className="flex justify-center space-x-8 md:space-x-12">
          <Link to="/about" className="text-[#571e00] hover:text-[#8B4513] transition-colors">About</Link>
          <Link to="/faq" className="text-[#571e00] hover:text-[#8B4513] transition-colors">FAQ</Link>
          <Link to="/blog" className="text-[#571e00] hover:text-[#8B4513] transition-colors">Blog</Link>
          <Link to="/login" className="text-[#571e00] hover:text-[#8B4513] transition-colors">Login</Link>
        </nav>
      </div>

      {/* Hero Banner */}
      <div className="relative">
        <img 
          src={babyOllie} 
          alt="Baby sleeping peacefully" 
          className="w-full h-[400px] md:h-[600px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-playfair italic text-[#571e00] text-4xl md:text-6xl text-center leading-relaxed max-w-4xl px-4">
            Rest-centered, postpartum<br />
            support for all families
          </h1>
        </div>
        
        {/* Acorn Buttons */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-16">
          <Link to="/services" className="relative">
            <img src={leftCorn} alt="" className="w-24 md:w-32" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-serif text-xl">
              Services
            </span>
          </Link>
          <Link to="/inquire" className="relative">
            <img src={rightCorn} alt="" className="w-24 md:w-32" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-serif text-xl">
              Inquire
            </span>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative mt-24 md:mt-32">
        <img 
          src={meadowBackground} 
          alt="" 
          className="w-full h-[600px] md:h-[800px] object-cover"
        />
        
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pt-16">
            {/* Letter */}
            <div className="relative w-full max-w-[400px] md:max-w-[500px]">
              <img 
                src={paper} 
                alt="" 
                className="w-full rotate-[4deg]"
              />
              <img 
                src={beeImage} 
                alt="" 
                className="absolute -left-8 -top-8 w-24 md:w-32 object-contain rotate-[25deg]"
              />
            </div>

            {/* Photo */}
            <div className="relative w-full max-w-[300px] md:max-w-[400px]">
              <img 
                src={polaroidFrame} 
                alt="" 
                className="w-full"
              />
              <img 
                src={babyEli} 
                alt="Baby portrait" 
                className="absolute top-[5%] left-[5%] w-[90%] h-[90%] object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage; 