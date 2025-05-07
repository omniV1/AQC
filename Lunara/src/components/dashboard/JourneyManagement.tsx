import React, { useState } from 'react';
import { User } from '../../types/user';

interface JourneyManagementProps {
  clients: User[];
}

export const JourneyManagement: React.FC<JourneyManagementProps> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-warm-brown mb-2">Journey Management</h2>
        <p className="text-warm-brown/60">Track and manage your clients' postpartum journeys</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 p-4">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Your Clients</h3>
            <div className="space-y-2">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedClient?.id === client.id
                      ? 'bg-sage/10 text-sage'
                      : 'hover:bg-cream/50 text-warm-brown'
                  }`}
                >
                  <div className="font-medium">
                    {client.firstName} {client.lastName}
                  </div>
                  <div className="text-sm text-warm-brown/60">
                    Started {new Date(client.createdAt).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Details */}
        <div className="lg:col-span-2">
          {selectedClient ? (
            <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-warm-brown">
                  {selectedClient.firstName}'s Journey
                </h3>
                <p className="text-warm-brown/60">
                  Tracking progress and milestones
                </p>
              </div>

              {/* Journey Timeline */}
              <div className="space-y-6">
                <div className="border-l-2 border-sage/20 pl-4 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-4 h-4 bg-sage rounded-full" />
                    <div>
                      <h4 className="font-medium text-warm-brown">Initial Assessment</h4>
                      <p className="text-sm text-warm-brown/60">Completed on {new Date(selectedClient.createdAt).toLocaleDateString()}</p>
                      <p className="mt-2 text-warm-brown">Initial postpartum assessment and care plan creation.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-4 h-4 bg-sage/50 rounded-full" />
                    <div>
                      <h4 className="font-medium text-warm-brown">First Week Support</h4>
                      <p className="text-sm text-warm-brown/60">In Progress</p>
                      <p className="mt-2 text-warm-brown">Daily check-ins and support during the first crucial week.</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-4 h-4 bg-warm-brown/20 rounded-full" />
                    <div>
                      <h4 className="font-medium text-warm-brown/60">Wellness Check</h4>
                      <p className="text-sm text-warm-brown/60">Scheduled for next week</p>
                      <p className="mt-2 text-warm-brown/60">Comprehensive wellness assessment and care plan adjustment.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <button className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200">
                  Update Journey
                </button>
                <button className="px-4 py-2 border border-sage text-sage rounded-lg hover:bg-sage/10 transition-colors duration-200">
                  Add Milestone
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 p-6 text-center text-warm-brown/60">
              Select a client to view their journey
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 