import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ClientLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { clientLogin, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await clientLogin({ email, password });
      // After successful login, the AuthContext will have the user role
      // The ProtectedRoute component will handle the redirection
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16">
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
          Sign in to access your postpartum care dashboard
        </p>
      </div>
      
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brown">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-brown">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

// TODO: Match visual design – https://www.figma.com/design/cdtATWBpZPGhK4Zz7jL0PS/Lunara?node-id=52-254&t=xw6y1BfnDJwu4YCs-4 