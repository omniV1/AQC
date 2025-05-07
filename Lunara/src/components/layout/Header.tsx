import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-cream shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-heading text-warm-brown hover:text-sage transition-colors duration-200">
                Lunara
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-warm-brown hover:text-sage transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-warm-brown hover:text-sage transition-colors duration-200"
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-warm-brown hover:text-sage transition-colors duration-200"
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-warm-brown hover:text-sage transition-colors duration-200"
                >
                  Dashboard
                </Link>
                {user?.role === 'PROVIDER' && (
                  <Link 
                    to="/availability" 
                    className="text-warm-brown hover:text-sage transition-colors duration-200"
                  >
                    Availability
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}