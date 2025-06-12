import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-center" style={{
      height: '170px',
      backgroundImage: 'url("/images/scallops.png")',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center bottom',
      backgroundSize: 'auto 100%'
    }}>
      <div className="max-w-[1076px] w-full grid grid-cols-3 items-center h-[120px] px-4 md:px-8">
        {/* Left Navigation Links – right-aligned toward center */}
        <div className="flex items-center justify-end gap-10">
          <Link
            to="/about"
            className="text-[20px] text-[#4E1B00] font-['Luxurious_Roman'] hover:text-[#A27B5C] transition-colors tracking-wide"
          >
            About
          </Link>
          <span className="text-[#4E1B00]">|</span>
          <Link
            to="/faq"
            className="text-[20px] text-[#4E1B00] font-['Luxurious_Roman'] hover:text-[#A27B5C] transition-colors tracking-wide"
          >
            FAQ
          </Link>
        </div>

        {/* Center Logo – absolutely centered */}
        <div className="flex items-center justify-center">
          <Link to="/" className="block">
            <img
              src="/images/wax%20seal.png"
              alt="Wax Seal"
              className="w-[90px] h-[90px] filter drop-shadow-[0_4px_38px_rgba(79,28,0,0.31)]"
            />
          </Link>
        </div>

        {/* Right Navigation Links – left-aligned toward center */}
        <div className="flex items-center justify-start gap-10">
          <Link
            to="/blog"
            className="text-[20px] text-[#4E1B00] font-['Luxurious_Roman'] hover:text-[#A27B5C] transition-colors tracking-wide"
          >
            Blog
          </Link>
          <span className="text-[#4E1B00]">|</span>
          <Link
            to="/login"
            className="text-[20px] text-[#4E1B00] font-['Luxurious_Roman'] hover:text-[#A27B5C] transition-colors tracking-wide"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

