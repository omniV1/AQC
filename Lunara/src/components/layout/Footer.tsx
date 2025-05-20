import React from 'react';
import lunaraLogoSmall from '../../Assets/lunara logo small.png';
import instaIcon from '../../Assets/insta.png';
import spotifyIcon from '../../Assets/spotify.png';
import pinsImage from '../../Assets/pins.png';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center bg-transparent px-4 py-16 mt-12">
      {/* Pins Image - Positioned to the left */}
      <img 
        src={pinsImage} 
        alt="Decorative pins" 
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-36 h-auto md:w-48 z-10"
      />

      <div className="flex flex-col md:flex-row justify-around w-full max-w-2xl mb-8">
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h3 className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-lg mb-2">Quick Links</h3>
          <a href="/about" className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-base mb-1 hover:underline">About</a>
          <a href="/services" className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-base mb-1 hover:underline">Services</a>
          <a href="/contact" className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-base hover:underline">Contact</a>
        </div>

        {/* Connect With Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-lg mb-2">Connect With Us</h3>
          <div className="flex flex-row">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                className="w-[40px] h-[40px] object-cover mr-2 transition-transform hover:scale-110"
                alt="Instagram"
                src={instaIcon}
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                className="w-[40px] h-[40px] object-cover transition-transform hover:scale-110"
                alt="Spotify"
                src={spotifyIcon}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Logo and Tagline */}
      <div className="flex flex-col items-center my-8">
         <img src={lunaraLogoSmall} alt="Lunara Logo" className="h-12 mb-3" />
         <p className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-center text-sm max-w-xs">
          Care that honors the sacred rhythm of birth, rest, and renewal.
         </p>
      </div>

      {/* Copyright */}
      <p className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-xs">
        © 2025 Lunara. All rights reserved.
      </p>
    </footer>
  );
} 