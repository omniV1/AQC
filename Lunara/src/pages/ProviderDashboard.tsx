import React, { useState, useEffect } from 'react';
import { UserService } from '../services/userService';
import { AuthService } from '../services/authService';
import { ClientManagementCenter } from '../components/dashboard/ClientManagementCenter';
import { CreateClientRequest } from '../types/provider';
import { User } from '../types/user';
import { PaginatedResponse } from '../types/models';
import { CommunicationHub } from '../components/dashboard/CommunicationHub';
import { AnalyticsInsights } from '../components/dashboard/AnalyticsInsights';

const ProviderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userService = UserService.getInstance();
  const authService = AuthService.getInstance();

  useEffect(() => {
    console.log('ProviderDashboard Debug:', {
      activeTab,
      clientsLength: clients.length,
      loading,
      error
    });
  }, [activeTab, clients, loading, error]);

  useEffect(() => {
    if (activeTab === 'clients') {
      console.log('Loading clients...');
      loadClients();
    }
  }, [activeTab]);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching clients...');
      const response = await userService.getClients({
        page: 1,
        pageSize: 10
      });
      console.log('Clients fetched successfully:', response);
      if (!response || !response.content) {
        throw new Error('Invalid response format: expected paginated data');
      }
      setClients(response.content);
    } catch (err: any) {
      console.error('Failed to load clients:', err);
      setError(err.message || 'Failed to load clients. Please try again later.');
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (clientData: CreateClientRequest) => {
    try {
      setError(null);
      await authService.registerClient(clientData);
      await loadClients();
    } catch (err) {
      console.error('Failed to add client:', err);
      setError('Failed to add client. Please try again.');
      throw err; // Re-throw to be handled by the form component
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-warm-brown/20">
          <button
            className={`px-4 py-2 font-serif ${
              activeTab === 'clients'
                ? 'text-sage border-b-2 border-sage'
                : 'text-warm-brown hover:text-sage'
            }`}
            onClick={() => setActiveTab('clients')}
          >
            Client Management
          </button>
          <button
            className={`px-4 py-2 font-serif ${
              activeTab === 'communication'
                ? 'text-sage border-b-2 border-sage'
                : 'text-warm-brown hover:text-sage'
            }`}
            onClick={() => setActiveTab('communication')}
          >
            Communication Hub
          </button>
          <button
            className={`px-4 py-2 font-serif ${
              activeTab === 'analytics'
                ? 'text-sage border-b-2 border-sage'
                : 'text-warm-brown hover:text-sage'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics & Insights
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          {activeTab === 'clients' && (
            <ClientManagementCenter
              clients={clients}
              onAddClient={handleAddClient}
            />
          )}
          {activeTab === 'communication' && <CommunicationHub />}
          {activeTab === 'analytics' && <AnalyticsInsights />}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 