import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Logo Section */}
                    <div className="text-center mb-12">
                        <img 
                            src="/images/logo.png"
                            alt="Lunara Logo" 
                            className="w-64 mx-auto mb-6"
                        />
                        <h2 className="text-2xl font-serif text-warm-brown mb-4">
                            Your Journey to Better Support Starts Here
                        </h2>
                        <p className="text-warm-brown/80 max-w-2xl mx-auto">
                            Lunara connects providers with clients to deliver personalized support
                            and guidance throughout their journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h3 className="text-xl font-serif text-warm-brown mb-4">For Providers</h3>
                            <p className="text-warm-brown/80 mb-6">
                                Access your dashboard to manage clients, schedule sessions,
                                and provide support.
                            </p>
                            <Link
                                to="/provider/login"
                                className="inline-block px-8 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
                            >
                                Provider Login
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h3 className="text-xl font-serif text-warm-brown mb-4">For Clients</h3>
                            <p className="text-warm-brown/80 mb-6">
                                Connect with your provider, schedule sessions, and access
                                your support resources.
                            </p>
                            <Link
                                to="/client/login"
                                className="inline-block px-8 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
                            >
                                Client Login
                            </Link>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-warm-brown/80">
                            New client? Please contact your provider to get registered.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}; 