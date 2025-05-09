import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../layout/Footer';

export const ProviderLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { providerLogin, error, clearError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        
        try {
            await providerLogin({ email, password });
            navigate('/provider/dashboard', { replace: true });
        } catch (err) {
            // Error is handled by the auth context
        }
    };

    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <div className="flex-grow">
                <div className="w-full max-w-2xl mx-auto px-6 py-16">
                    {/* Logo Section */}
                    <div className="mb-12 text-center">
                        <img 
                            src="/images/logo.png"
                            alt="Lunara Logo" 
                            className="w-64 mx-auto mb-6"
                        />
                        <h1 className="text-3xl font-serif text-warm-brown">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-warm-brown/80">
                            Sign in to access your provider dashboard
                        </p>
                    </div>
                    
                    {/* Login Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-warm-brown">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-warm-brown">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
                            >
                                Sign In
                            </button>

                            <div className="text-center mt-4">
                                <p className="text-warm-brown/80">
                                    New provider?{' '}
                                    <Link 
                                        to="/provider/register" 
                                        className="text-sage hover:text-sage/80 font-medium"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}; 