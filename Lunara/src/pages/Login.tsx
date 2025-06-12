import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { clientLogin } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await clientLogin(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: LoginCredentials) => ({
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
            Welcome Back
          </h1>
          <p className="mt-4 text-brown/80">
            Sign in to access your personalized postpartum support dashboard
          </p>
        </div>
        
        {/* Login Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50/50 border border-red-100 text-red-700 p-4 rounded text-center">
                {error}
              </div>
            )}
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
              <p className="mt-1 text-xs text-brown/60">Enter the email address you used to register</p>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple placeholder:text-brown/40"
              />
              <p className="mt-1 text-xs text-brown/60">Must be at least 8 characters long</p>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple/80 text-white font-medium py-2.5 px-8 rounded transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-center space-y-4 pt-8 border-t border-brown/10">
            <p className="text-brown/90">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-purple hover:text-purple/80 transition-colors duration-200">
                Create one here
              </Link>
            </p>
            <p className="text-sm italic text-brown/70">
              Welcome to your postpartum support journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 