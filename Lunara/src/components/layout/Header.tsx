import React from 'react';
import { Link } from 'react-router-dom';
import lunaraLogo from '../../Assets/lunara logo.png';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <Link to="/" className="w-40 mb-4">
          <img src={lunaraLogo} alt="Lunara" className="w-full h-auto" />
        </Link>
        
        <nav className="flex items-center space-x-6 text-[#571e00] [font-family:'Luxurious_Roman-Regular',Helvetica]">
          <Link to="/about" className="hover:text-[#A27B5C] transition-colors text-lg">About</Link>
          <Link to="/faq" className="hover:text-[#A27B5C] transition-colors text-lg">FAQ</Link>
          <Link to="/blog" className="hover:text-[#A27B5C] transition-colors text-lg">Blog</Link>
          <Link to="/login" className="hover:text-[#A27B5C] transition-colors text-lg">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;