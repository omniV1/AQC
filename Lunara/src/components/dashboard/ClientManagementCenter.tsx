import React, { useState } from 'react';
import { User } from '../../types/user';
import { CreateClientRequest } from '../../types/provider';
import { AddClientForm } from '../forms/AddClientForm';

interface ClientManagementCenterProps {
  clients: User[];
  onAddClient: (client: CreateClientRequest) => Promise<void>;
}

export const ClientManagementCenter: React.FC<ClientManagementCenterProps> = ({ clients = [], onAddClient }) => {
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = clients.filter(client => {
    if (filterStatus === 'all') return true;
    return filterStatus === 'active' ? client.status === 'ACTIVE' : client.status !== 'ACTIVE';
  });

  const handleAddClient = async (clientData: CreateClientRequest) => {
    await onAddClient(clientData);
    setShowAddClient(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif text-warm-brown">Client Management Center</h2>
          <p className="text-warm-brown/60">Manage your client relationships and onboarding</p>
        </div>
        <button
          onClick={() => setShowAddClient(true)}
          className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-200"
        >
          Add New Client
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-3 py-2 border border-warm-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-sage"
          >
            <option value="all">All Clients</option>
            <option value="active">Active Clients</option>
            <option value="inactive">Inactive Clients</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded ${
              view === 'grid' ? 'bg-sage/10 text-sage' : 'text-warm-brown/60 hover:text-warm-brown'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded ${
              view === 'list' ? 'bg-sage/10 text-sage' : 'text-warm-brown/60 hover:text-warm-brown'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Client List */}
      <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredClients.length === 0 ? (
          <div className="col-span-full text-center py-8 text-warm-brown/60">
            No clients found. Click "Add New Client" to get started.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className={`bg-white ${
                view === 'grid'
                  ? 'rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'
                  : 'border border-warm-brown/10 rounded-lg p-4 hover:border-warm-brown/20 transition-colors'
              }`}
              onClick={() => setSelectedClient(client)}
            >
              <div className={view === 'grid' ? 'space-y-4' : 'flex justify-between items-center'}>
                <div>
                  <h3 className="text-xl font-semibold text-warm-brown">
                    {client.firstName} {client.lastName}
                  </h3>
                  <p className="text-warm-brown/60">{client.email}</p>
                </div>
                <div className={view === 'grid' ? 'flex justify-between items-center mt-4' : 'flex items-center space-x-4'}>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      client.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {client.status}
                  </span>
                  <button
                    className="text-sage hover:text-sage/80 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClient(client);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-warm-brown">Add New Client</h2>
              <button
                onClick={() => setShowAddClient(false)}
                className="text-warm-brown/60 hover:text-warm-brown"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddClientForm onSubmit={handleAddClient} onCancel={() => setShowAddClient(false)} />
          </div>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-warm-brown">Client Details</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-warm-brown/60 hover:text-warm-brown"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-warm-brown/60">Name</label>
                    <p className="text-warm-brown">
                      {selectedClient.firstName} {selectedClient.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-warm-brown/60">Email</label>
                    <p className="text-warm-brown">{selectedClient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-warm-brown/60">Status</label>
                    <p className="text-warm-brown">{selectedClient.status}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Journey Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-warm-brown/60">Start Date</label>
                    <p className="text-warm-brown">
                      {new Date(selectedClient.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-warm-brown/60">Last Updated</label>
                    <p className="text-warm-brown">
                      {new Date(selectedClient.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 