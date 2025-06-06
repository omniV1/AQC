import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] text-[#571E00] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="font-['Luxurious_Roman'] text-xl mb-4">Lunara</h3>
          <p className="text-sm mb-2">Your sanctuary for beauty and wellness</p>
          <p className="text-sm">© {new Date().getFullYear()} Lunara. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="font-['Luxurious_Roman'] text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-sm hover:text-[#A27B5C] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-sm hover:text-[#A27B5C] transition-colors">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="text-sm hover:text-[#A27B5C] transition-colors">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-sm hover:text-[#A27B5C] transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="font-['Luxurious_Roman'] text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>123 Beauty Lane</li>
            <li>Wellness City, WC 12345</li>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@lunara.com</li>
          </ul>
        </div>

        {/* Hours */}
        <div className="text-center md:text-left">
          <h4 className="font-['Luxurious_Roman'] text-lg mb-4">Hours</h4>
          <ul className="space-y-2 text-sm">
            <li>Monday - Friday: 9am - 8pm</li>
            <li>Saturday: 9am - 6pm</li>
            <li>Sunday: 10am - 5pm</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-[#571E00]/20">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/privacy" className="hover:text-[#A27B5C] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#A27B5C] transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A27B5C] transition-colors">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A27B5C] transition-colors">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A27B5C] transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


