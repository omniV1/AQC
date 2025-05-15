import React from 'react';
import { Link } from 'react-router-dom';
import lunaraLogo from '../../Assets/lunara logo.png';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="w-32">
          <img src={lunaraLogo} alt="Lunara" className="w-full" />
        </Link>
        
        <div className="flex items-center space-x-8 text-[#2C3639] font-serif">
          <Link to="/about" className="hover:text-[#A27B5C] transition-colors">About</Link>
          <Link to="/faq" className="hover:text-[#A27B5C] transition-colors">FAQ</Link>
          <Link to="/blog" className="hover:text-[#A27B5C] transition-colors">Blog</Link>
          <Link to="/login" className="hover:text-[#A27B5C] transition-colors">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;