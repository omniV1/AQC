import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../layout/Footer';

export const ProviderRegistration: React.FC = () => {
    const navigate = useNavigate();
    const { registerProvider, error, clearError } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        registrationCode: ''
    });
    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormError('');
        clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address');
            return;
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setFormError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }

        try {
            await registerProvider({
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                registrationCode: formData.registrationCode
            });
            navigate('/provider/login');
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.response?.data?.message) {
                setFormError(err.response.data.message);
            } else if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors).join(', ');
                setFormError(`Validation failed: ${errorMessages}`);
            } else if (err.message) {
                setFormError(err.message);
            } else {
                setFormError('An unexpected error occurred during registration. Please try again.');
            }
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
                            Provider Registration
                        </h1>
                        <p className="mt-2 text-warm-brown/80">
                            Create your provider account to get started
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {(error || formError) && (
                            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                                {error || formError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                                <p className="mt-1 text-sm text-warm-brown/60">
                                    Must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                    className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-warm-brown mb-1" htmlFor="registrationCode">
                                    Registration Code
                                </label>
                                <input
                                    type="text"
                                    id="registrationCode"
                                    name="registrationCode"
                                    value={formData.registrationCode}
                                    onChange={handleChange}
                                    required
                                    className="block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
                                />
                                <p className="mt-1 text-sm text-warm-brown/60">
                                    Please enter the provider registration code you received
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
                            >
                                Create Account
                            </button>

                            <div className="text-center mt-4">
                                <p className="text-warm-brown/80">
                                    Already have an account?{' '}
                                    <Link 
                                        to="/provider/login" 
                                        className="text-sage hover:text-sage/80 font-medium"
                                    >
                                        Sign in here
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