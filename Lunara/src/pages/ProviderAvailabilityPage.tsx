import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProviderAvailabilityManager } from '../components/availability/ProviderAvailabilityManager';
import { Navigate } from 'react-router-dom';

export const ProviderAvailabilityPage: React.FC = () => {
  const { user } = useAuth();

  // Redirect non-providers to home page
  if (!user || user.role !== 'PROVIDER') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-forest-green mb-4">
            Manage Your Availability
          </h1>
          <p className="text-brown-dark">Set your weekly availability schedule for support sessions</p>
        </div>

        <ProviderAvailabilityManager />
      </div>
    </div>
  );
}; 