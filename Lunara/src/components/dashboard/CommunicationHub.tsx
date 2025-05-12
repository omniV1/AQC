import React, { useState } from 'react';
import { User } from '../../types/user';
import { Message } from '../../types/models';

interface CommunicationHubProps {
  clients?: User[];
}

export const CommunicationHub: React.FC<CommunicationHubProps> = ({ clients = [] }) => {
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      recipientId: 2,
      content: 'Hi, how are you feeling today?',
      read: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      senderId: 2,
      recipientId: 1,
      content: 'I\'m doing well, thank you! The breathing exercises have been really helpful.',
      read: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // TODO: Implement actual message sending
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-warm-brown mb-2">Communication Hub</h2>
        <p className="text-warm-brown/60">Stay connected with your clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Client List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 p-4">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Conversations</h3>
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
                    Last message: 2h ago
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          {selectedClient ? (
            <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-warm-brown/10">
                <h3 className="font-medium text-warm-brown">
                  Chat with {selectedClient.firstName} {selectedClient.lastName}
                </h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === 1 ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === 1
                          ? 'bg-sage text-white'
                          : 'bg-cream/50 text-warm-brown'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-warm-brown/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-warm-brown/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-warm-brown/10 p-6 text-center text-warm-brown/60">
              Select a client to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 