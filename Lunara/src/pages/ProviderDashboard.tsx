import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { CreateClientRequest } from '../types/provider';
import { AuthService } from '../services/authService';
import { UserService } from '../services/userService';
import { ClientManagementCenter } from '../components/dashboard/ClientManagementCenter';
import { JourneyManagement } from '../components/dashboard/JourneyManagement';
import { CommunicationHub } from '../components/dashboard/CommunicationHub';
import { AnalyticsInsights } from '../components/dashboard/AnalyticsInsights';

const ProviderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'journey' | 'communication' | 'analytics'>('clients');
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authService = AuthService.getInstance();
  const userService = UserService.getInstance();

  console.log('ProviderDashboard Debug:', {
    activeTab,
    clientsLength: clients.length,
    loading,
    error
  });

  useEffect(() => {
    console.log('Loading clients...');
    loadClients();
  }, []);

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

  const renderActiveTab = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
          <div className="ml-3 text-warm-brown">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-red-500">{error}</div>
          <button
            onClick={loadClients}
            className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'clients':
        return <ClientManagementCenter clients={clients || []} onAddClient={handleAddClient} />;
      case 'journey':
        return <JourneyManagement clients={clients || []} />;
      case 'communication':
        return <CommunicationHub clients={clients || []} />;
      case 'analytics':
        return <AnalyticsInsights clients={clients || []} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-warm-brown">Provider Dashboard</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-warm-brown/20 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('clients')}
              className={`${
                activeTab === 'clients'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-warm-brown hover:border-warm-brown/20 hover:text-warm-brown/80'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Client Management
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`${
                activeTab === 'journey'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-warm-brown hover:border-warm-brown/20 hover:text-warm-brown/80'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Journey Management
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`${
                activeTab === 'communication'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-warm-brown hover:border-warm-brown/20 hover:text-warm-brown/80'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Communication Hub
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${
                activeTab === 'analytics'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-warm-brown hover:border-warm-brown/20 hover:text-warm-brown/80'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics & Insights
            </button>
          </nav>
        </div>

        {/* Active Tab Content */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 