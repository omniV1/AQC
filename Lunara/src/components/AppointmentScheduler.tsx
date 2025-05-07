import React, { useState, useEffect } from 'react';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import { Calendar } from './Calendar';
import { useAuth } from '../hooks/useAuth';
import { fetchProviderAvailability, createAppointment } from '../services/api';
import type { ProviderAvailability } from '../services/api';

interface Provider {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface AppointmentSchedulerProps {
  onScheduled?: () => void;
}

export const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onScheduled }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<ProviderAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch providers
    fetch('http://localhost:8081/api/v1/users/providers')
      .then(res => res.json())
      .then(data => setProviders(data))
      .catch(err => setError('Failed to load providers'));
  }, []);

  useEffect(() => {
    if (selectedProvider && selectedDate) {
      const startDate = setHours(selectedDate, 0);
      const endDate = setHours(addHours(selectedDate, 23), 59);

      fetchProviderAvailability(selectedProvider.id, startDate, endDate)
        .then(data => setAvailability(data))
        .catch(() => setError('Failed to load provider availability'));
    }
  }, [selectedProvider, selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSchedule = async () => {
    if (!selectedProvider || !selectedDate || !selectedTime || !user) {
      setError('Please select all required fields');
      return;
    }

    try {
      setLoading(true);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = setMinutes(setHours(selectedDate, hours), minutes);
      const endTime = addHours(startTime, 1); // 1-hour appointments

      await createAppointment({
        providerId: selectedProvider.id,
        startTime: format(startTime, "yyyy-MM-dd'T'HH:mm:ss"),
        endTime: format(endTime, "yyyy-MM-dd'T'HH:mm:ss"),
        location: 'Virtual',
      });

      onScheduled?.();
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedProvider(null);
    } catch (err) {
      setError('Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableTimeSlots = () => {
    if (!selectedDate || !selectedProvider || availability.length === 0) return [];

    const dayOfWeek = selectedDate.getDay();
    const dayAvailability = availability.find(a => a.dayOfWeek === dayOfWeek);

    if (!dayAvailability) return [];

    const slots: string[] = [];
    const [startHour] = dayAvailability.startTime.split(':').map(Number);
    const [endHour] = dayAvailability.endTime.split(':').map(Number);

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return slots;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-serif text-brown-dark mb-2">Select Provider</h3>
        <select
          value={selectedProvider?.id || ''}
          onChange={(e) => {
            const provider = providers.find(p => p.id === Number(e.target.value));
            setSelectedProvider(provider || null);
          }}
          className="w-full p-2 border border-sage rounded"
        >
          <option value="">Select a provider...</option>
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.firstName} {provider.lastName}
            </option>
          ))}
        </select>
      </div>

      {selectedProvider && (
        <div>
          <h3 className="text-lg font-serif text-brown-dark mb-2">Select Date</h3>
          <Calendar
            providerId={selectedProvider.id}
            onSlotSelect={handleDateSelect}
          />
        </div>
      )}

      {selectedDate && (
        <div>
          <h3 className="text-lg font-serif text-brown-dark mb-2">Select Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {getAvailableTimeSlots().map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded ${
                  selectedTime === time
                    ? 'bg-forest-green text-white'
                    : 'bg-sage-light hover:bg-sage/10'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        onClick={handleSchedule}
        disabled={!selectedProvider || !selectedDate || !selectedTime || loading}
        className="w-full py-2 px-4 bg-forest-green text-white rounded disabled:opacity-50"
      >
        {loading ? 'Scheduling...' : 'Schedule Appointment'}
      </button>
    </div>
  );
}; 