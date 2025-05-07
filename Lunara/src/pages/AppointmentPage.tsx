import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AppointmentCalendar } from '../components/appointments/AppointmentCalendar';
import { AppointmentScheduleModal } from '../components/appointments/AppointmentScheduleModal';
import { appointmentService } from '../services/appointmentService';

interface SupportProvider {
  id: number;
  firstName: string;
  lastName: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  provider: SupportProvider;
  status: string;
  location: string;
  notes?: string;
}

export const AppointmentPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providers, setProviders] = useState<SupportProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number>();
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  useEffect(() => {
    fetchSupportSessions();
    fetchProviders();
  }, []);

  const fetchSupportSessions = async () => {
    try {
      setIsLoading(true);
      const data = await appointmentService.getAll();
      setSessions(data.map(session => ({
        id: session.id,
        title: `Session with ${session.provider.firstName} ${session.provider.lastName}`,
        start: new Date(session.startTime),
        end: new Date(session.endTime),
        provider: session.provider,
        status: session.status,
        location: session.location,
        notes: session.notes
      })));
    } catch (err) {
      setError('Failed to load support sessions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/v1/users/providers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch support providers');
      }

      const data = await response.json();
      setProviders(data);
    } catch (err) {
      setError('Failed to load support providers. Please try again.');
    }
  };

  const handleScheduleSession = async (formData: any) => {
    try {
      const newSession = await appointmentService.create({
        providerId: formData.providerId,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        notes: formData.notes
      });

      setSessions(prev => [...prev, {
        id: newSession.id,
        title: `Session with ${newSession.provider.firstName} ${newSession.provider.lastName}`,
        start: new Date(newSession.startTime),
        end: new Date(newSession.endTime),
        provider: newSession.provider,
        status: newSession.status,
        location: newSession.location,
        notes: newSession.notes
      }]);

      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to schedule support session. Please try again.');
    }
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    // Handle clicking on an existing event
    // Could show event details or allow cancellation/rescheduling
  };

  const handleProviderChange = (providerId: number) => {
    setSelectedProvider(providerId);
    // Filter sessions by provider if needed
    if (providerId) {
      setSessions(prev => prev.filter(session => session.provider.id === providerId));
    } else {
      fetchSupportSessions(); // Reset to show all sessions
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-cream p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-brown">Loading support sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-forest-green mb-4">
            My Support Sessions
          </h1>
          <p className="text-brown-dark">Schedule and manage your support sessions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Calendar */}
        <AppointmentCalendar
          sessions={sessions}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          providers={providers}
          selectedProvider={selectedProvider}
          onProviderChange={handleProviderChange}
        />

        {/* Schedule Modal */}
        {isModalOpen && (
          <AppointmentScheduleModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedSlot(null);
            }}
            onSchedule={handleScheduleSession}
            initialStartTime={selectedSlot?.start}
            initialEndTime={selectedSlot?.end}
            providers={providers}
          />
        )}
      </div>
    </div>
  );
}; 