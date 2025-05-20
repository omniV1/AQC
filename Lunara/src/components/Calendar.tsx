import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
// import { useAuth } from '../hooks/useAuth'; // Commented out as user variable is not used
import { fetchAppointments, fetchProviderAvailability } from '../services/api';
import { Appointment as ApiAppointment, ProviderAvailability as ApiProviderAvailability } from '../types/api';

interface CalendarProps {
  providerId?: number;
  onSlotSelect?: (startTime: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ providerId, onSlotSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [availability, setAvailability] = useState<ApiProviderAvailability[]>([]);
  // const { user } = useAuth(); // Marked as unused in previous errors, commenting out

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
        .then(data => {
          console.log('Fetched provider availability (raw):', data);
          setAvailability(data); // Use the fetched data, assuming it matches ApiProviderAvailability
        })
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

          // Check if there is any availability slot for the current day
          const isDayGenerallyAvailable = providerId && availability.some(avail => 
            avail.dayOfWeek === day.getDay()
            // We assume if a slot exists for this day, the provider has some availability.
            // The 'isAvailable' boolean was on the local interface, not the API one.
            // Specific slot booking status would come from appointments data.
          );

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 ${
                isDayGenerallyAvailable ? 'bg-sage-light cursor-pointer hover:bg-sage/10' : 'bg-cream' // Use isDayGenerallyAvailable
              }`}
              onClick={() => isDayGenerallyAvailable && onSlotSelect?.(day)} // Use isDayGenerallyAvailable
            >
              <div className="font-medium text-brown-dark">{format(day, 'd')}</div>
              <div className="space-y-1 mt-1">
                {dayAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="text-xs p-1 rounded bg-forest-green text-white"
                  >
                    {format(new Date(apt.startTime), 'h:mm a')} - {apt.provider.firstName} {apt.provider.lastName}
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