import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-cream shadow-sm py-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center transition-transform duration-200 ease-in-out hover:text-sage">
            <h1 className="font-heading text-2xl text-warm-brown">
              Lunara
            </h1>
          </Link>
        </div>
        <div className="space-x-8">
          <Link to="/about" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
            About
          </Link>
          <Link to="/services" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
            Services
          </Link>
          <Link to="/contact" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
                Dashboard
              </Link>
              {user?.role === 'PROVIDER' && (
                <Link to="/availability" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
                  Availability
                </Link>
              )}
              <button
                onClick={logout}
                className="text-lg text-warm-brown hover:text-sage transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-lg text-warm-brown hover:text-sage transition-colors duration-200">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}