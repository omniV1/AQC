import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-heading text-warm-brown mb-6 text-center">Provider Registration</h2>
            
            {(error || formError) && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error || formError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                </div>

                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                </div>

                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                </div>

                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                </div>

                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                </div>

                <div>
                    <label className="block text-warm-brown mb-1" htmlFor="registrationCode">
                        Registration Code
                    </label>
                    <input
                        type="text"
                        id="registrationCode"
                        name="registrationCode"
                        value={formData.registrationCode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-sage rounded focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                    <p className="text-sm text-warm-brown/60 mt-1">
                        Please enter the provider registration code you received
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-sage text-white py-2 rounded hover:bg-sage/90 transition-colors duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    );
}; 