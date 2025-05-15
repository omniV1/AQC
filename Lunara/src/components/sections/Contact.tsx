import React from 'react';
import instaIcon from '../../Assets/insta.png';
import spotifyIcon from '../../Assets/spotify.png';
import lunaraLogo from '../../Assets/lunara logo small.png';

const Contact: React.FC = () => {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-8">
          <a 
            href="https://instagram.com/lunara" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <img src={instaIcon} alt="Instagram" className="w-12 h-12" />
          </a>
          <a 
            href="/" 
            className="transform hover:scale-110 transition-transform"
          >
            <img src={lunaraLogo} alt="Lunara" className="w-12 h-12" />
          </a>
          <a 
            href="https://spotify.com/lunara" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <img src={spotifyIcon} alt="Spotify" className="w-12 h-12" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact; 