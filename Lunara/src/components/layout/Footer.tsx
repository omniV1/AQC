import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-warm-brown/10 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center">
            <img 
              src="/images/logo.png" 
              alt="Lunara Logo" 
              className="w-32 h-auto mb-4 mx-auto"
            />
            <p className="text-warm-brown/80 text-sm">
              Care that honors the sacred rhythms of birth, rest, and renewal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-heading text-warm-brown mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-warm-brown/80 hover:text-sage transition-colors duration-200">
                About
              </Link>
              <Link to="/services" className="text-warm-brown/80 hover:text-sage transition-colors duration-200">
                Services
              </Link>
              <Link to="/contact" className="text-warm-brown/80 hover:text-sage transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center">
            <h3 className="font-heading text-warm-brown mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-6 mb-4">
              <a 
                href="https://www.instagram.com/lunaracare/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warm-brown/80 hover:text-sage transition-colors duration-200"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a 
                href="mailto:hello@thequietchapter.com"
                className="text-warm-brown/80 hover:text-sage transition-colors duration-200"
                aria-label="Email"
              >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </a>
              <a 
                href="#"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warm-brown/80 hover:text-sage transition-colors duration-200"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
            </div>
            <p className="text-warm-brown/80 text-sm">
              Serving Litchfield Park & the West Valley, AZ
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-warm-brown/10">
          <p className="text-warm-brown/60 text-sm">
            &copy; {new Date().getFullYear()} Lunara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 