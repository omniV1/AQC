import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AppointmentService } from '../services/appointmentService';
import { ProviderService } from '../services/providerService';
import { Appointment, Provider } from '../types/api';
import { AppointmentCalendar } from '../components/appointments/AppointmentCalendar';
import { AppointmentScheduleModal } from '../components/appointments/AppointmentScheduleModal';

interface CalendarEvent extends Omit<Appointment, 'startTime' | 'endTime'> {
  title: string;
  start: Date;
  end: Date;
}

const AppointmentPage = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<CalendarEvent[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<number>();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appointmentService = AppointmentService.getInstance();
  const providerService = ProviderService.getInstance();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await providerService.getProviders();
        setProviders(data);
      } catch (err) {
        setError('Failed to load providers');
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await appointmentService.getMyAppointments({
          providerId: selectedProvider
        });
        setSessions(data.data.map(session => ({
          ...session,
          title: `Session with ${session.provider.firstName} ${session.provider.lastName}`,
          start: new Date(session.startTime),
          end: new Date(session.endTime),
        })));
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedProvider]);

  const handleProviderChange = (providerId: number) => {
    setSelectedProvider(providerId);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo);
    setIsScheduleModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsScheduleModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsScheduleModalOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Appointments</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Provider
        </label>
        <select
          id="provider"
          value={selectedProvider}
          onChange={(e) => handleProviderChange(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="">All Providers</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.firstName} {provider.lastName}
            </option>
          ))}
        </select>
      </div>

      <AppointmentCalendar
        sessions={sessions}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        providers={providers}
        selectedProvider={selectedProvider}
        onProviderChange={handleProviderChange}
      />

      {isScheduleModalOpen && (
        <AppointmentScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={handleCloseModal}
          selectedSlot={selectedSlot}
          selectedEvent={selectedEvent}
          providers={providers}
        />
      )}
    </div>
  );
};

export default AppointmentPage; 