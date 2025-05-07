import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-sage-light flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-center">
                    <h1 className="text-3xl font-serif text-brown-dark text-center">
                        Welcome to Lunara
                    </h1>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-serif text-brown-dark mb-4">
                            Your Journey to Better Support Starts Here
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Lunara connects providers with clients to deliver personalized support
                            and guidance throughout their journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h3 className="text-xl font-serif text-brown-dark mb-4">For Providers</h3>
                            <p className="text-gray-600 mb-6">
                                Access your dashboard to manage clients, schedule sessions,
                                and provide support.
                            </p>
                            <Link
                                to="/provider/login"
                                className="inline-block px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green/90 transition-colors"
                            >
                                Provider Login
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h3 className="text-xl font-serif text-brown-dark mb-4">For Clients</h3>
                            <p className="text-gray-600 mb-6">
                                Connect with your provider, schedule sessions, and access
                                your support resources.
                            </p>
                            <Link
                                to="/client/login"
                                className="inline-block px-6 py-3 bg-forest-green text-white rounded-lg hover:bg-forest-green/90 transition-colors"
                            >
                                Client Login
                            </Link>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            New client? Please contact your provider to get registered.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-sage">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <p className="text-center text-gray-600">
                        &copy; {new Date().getFullYear()} Lunara. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}; 