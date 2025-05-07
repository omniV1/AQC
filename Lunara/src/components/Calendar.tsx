import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { fetchAppointments, fetchProviderAvailability } from '../services/api';

interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  providerId: number;
  providerName: string;
  status: string;
  location: string;
}

interface ProviderAvailability {
  providerId: number;
  providerName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface CalendarProps {
  providerId?: number;
  onSlotSelect?: (startTime: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ providerId, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availability, setAvailability] = useState<ProviderAvailability[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);

    // Fetch appointments
    fetchAppointments(startDate, endDate)
      .then(data => setAppointments(data))
      .catch(error => console.error('Failed to fetch appointments:', error));

    // If viewing a provider's calendar, fetch their availability
    if (providerId) {
      fetchProviderAvailability(providerId, startDate, endDate)
        .then(data => setAvailability(data))
        .catch(error => console.error('Failed to fetch provider availability:', error));
    }
  }, [currentDate, providerId]);

  const renderWeekDays = () => {
    const weekStart = startOfWeek(currentDate);
    return (
      <div className="grid grid-cols-7 gap-px bg-sage-light">
        {Array.from({ length: 7 }).map((_, index) => {
          const day = addDays(weekStart, index);
          return (
            <div key={index} className="py-2 text-center text-brown-dark font-medium">
              {format(day, 'EEE')}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="grid grid-cols-7 gap-px bg-white">
        {days.map((day, index) => {
          const dayAppointments = appointments.filter(apt => 
            format(new Date(apt.startTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          const isAvailable = providerId && availability.some(avail => 
            avail.dayOfWeek === day.getDay() && avail.isAvailable
          );

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 ${
                isAvailable ? 'bg-sage-light cursor-pointer hover:bg-sage/10' : 'bg-cream'
              }`}
              onClick={() => isAvailable && onSlotSelect?.(day)}
            >
              <div className="font-medium text-brown-dark">{format(day, 'd')}</div>
              <div className="space-y-1 mt-1">
                {dayAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="text-xs p-1 rounded bg-forest-green text-white"
                  >
                    {format(new Date(apt.startTime), 'h:mm a')} - {apt.providerName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif text-brown-dark">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentDate(prev => addDays(prev, -30))}
            className="px-3 py-1 rounded bg-sage text-white hover:bg-sage/90"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentDate(prev => addDays(prev, 30))}
            className="px-3 py-1 rounded bg-sage text-white hover:bg-sage/90"
          >
            Next
          </button>
        </div>
      </div>
      {renderWeekDays()}
      {renderDays()}
    </div>
  );
}; 