import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-brand-accent text-brand-text py-8 mt-16 border-t border-brand-text/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          {/* Quick Links - Changed hover color */}
          <Link to="/about" className="px-3 py-2 hover:text-brand-secondary transition-colors duration-200">About</Link>
          <Link to="/services" className="px-3 py-2 hover:text-brand-secondary transition-colors duration-200">Services</Link>
          <Link to="/contact" className="px-3 py-2 hover:text-brand-secondary transition-colors duration-200">Contact</Link>
        </div>

        <div className="mb-4 flex justify-center space-x-6">
          {/* Social Links - Changed hover color */}
          <a href="https://www.instagram.com/lunaracare/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-brand-secondary transition-colors duration-200 text-2xl">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" /* Replace with actual Facebook URL */ aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-brand-secondary transition-colors duration-200 text-2xl">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="mailto:hello@thequietchapter.com" /* Replace with actual email */ aria-label="Email" className="hover:text-brand-secondary transition-colors duration-200 text-2xl">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        <p className="text-sm text-brand-text/80">
          &copy; {new Date().getFullYear()} Lunara. All rights reserved.
        </p>
        <p className="text-xs text-brand-text/60 mt-1">
          Serving Litchfield Park & the West Valley, AZ
        </p>
        <p className="text-xs text-brand-text/60">
          &copy; {new Date().getFullYear()} Lunara. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 