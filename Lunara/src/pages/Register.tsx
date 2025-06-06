import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ClientRegistrationData } from '../types/auth';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { registerClient } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ClientRegistrationData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    providerId: 0, // This will be set based on provider selection
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await registerClient(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: ClientRegistrationData) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <img 
            src="/images/logo.png"
            alt="Lunara Logo" 
            className="w-64 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-brown">
            Begin Your Journey
          </h1>
          <p className="mt-4 text-brown/80">
            Create your account to access personalized postpartum support and resources
          </p>
        </div>
        
        {/* Registration Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50/50 border border-red-100 text-red-700 p-4 rounded text-center">
                {error}
              </div>
            )}

            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-brown">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-brown mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    required 
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-brown mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    required 
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                />
                <p className="mt-1 text-xs text-brown/60">We'll use this email to send you important updates and resources</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">
                  Password
                </label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  required 
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
                />
                <p className="mt-1 text-xs text-brown/60">Must be at least 8 characters long</p>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-center space-y-4 pt-8 border-t border-brown/10">
            <p className="text-brown/90">
              Already have an account?{' '}
              <Link to="/login" className="text-purple hover:text-purple/80 transition-colors duration-200">
                Sign in here
              </Link>
            </p>
            <p className="text-sm italic text-brown/70">
              We're honored to be part of your postpartum journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 