import React from 'react';
import lunaraLogoSmall from '../../Assets/lunara logo small.png';
import insta from '../../Assets/insta.png';
import spotify from '../../Assets/spotify.png';

export default function Footer() {
  return (
    <footer className="w-full bg-[#faf7f2] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center gap-24">
          <a 
            href="https://instagram.com" 
            className="w-20 h-20 transition-opacity hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={insta}
              alt="Instagram"
              className="w-full h-full object-contain sepia"
            />
          </a>
          <img
            src={lunaraLogoSmall}
            alt="Lunara"
            className="w-24 h-24 object-contain"
          />
          <a 
            href="https://spotify.com"
            className="w-20 h-20 transition-opacity hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={spotify}
              alt="Spotify"
              className="w-full h-full object-contain sepia"
            />
          </a>
        </div>
        <p className="text-center text-[#571e00] text-lg mt-6">© 2025 Lunara. All rights reserved.</p>
      </div>
    </footer>
  );
} 