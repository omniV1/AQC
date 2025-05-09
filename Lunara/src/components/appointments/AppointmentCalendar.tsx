import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, addMonths, subMonths, addWeeks, subWeeks, parseISO, isBefore, startOfMonth, setHours, setMinutes, isWithinInterval } from 'date-fns';
import { parse } from 'date-fns';
import { startOfWeek } from 'date-fns';
import { getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import { AppointmentService } from '../../services/appointmentService';
import { ProviderService } from '../../services/providerService';
import { Appointment, Provider } from '../../types/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface CalendarEvent extends Omit<Appointment, 'startTime' | 'endTime'> {
  title: string;
  start: Date;
  end: Date;
}

interface AppointmentCalendarProps {
  sessions: CalendarEvent[];
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  providers: Provider[];
  selectedProvider: number | undefined;
  onProviderChange: (providerId: number) => void;
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 17,  // 5 PM
};

const AFTER_HOURS_MESSAGE = `
Limited availability during after-hours.
• For emergencies, please contact your healthcare provider or call 911
• For non-emergencies, feel free to reach out via:
  - Discord
  - Social Media
  - Email
We'll respond as soon as possible.
`;

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  sessions,
  onSelectSlot,
  onSelectEvent,
  providers,
  selectedProvider,
  onProviderChange,
}) => {
  const { user } = useAuth();
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate, setCurrentDate] = useState(() => {
    const date = user?.createdAt ? parseISO(user.createdAt) : new Date();
    return setMinutes(setHours(date, date.getHours()), 0);
  });
  const [events, setEvents] = useState<CalendarEvent[]>(sessions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appointmentService = AppointmentService.getInstance();
  const providerService = ProviderService.getInstance();

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const startDate = view === 'month' 
        ? startOfMonth(currentDate)
        : subWeeks(currentDate, 1);
      const endDate = view === 'month'
        ? addMonths(startDate, 1)
        : addWeeks(currentDate, 1);

      const response = await appointmentService.getMyAppointments({
        startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
        endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
        providerId: selectedProvider
      });
      
      const calendarEvents = response.data.map((appointment: Appointment) => ({
        ...appointment,
        title: `Session with ${appointment.provider.firstName} ${appointment.provider.lastName}`,
        start: parseISO(appointment.startTime),
        end: parseISO(appointment.endTime),
      }));

      setEvents(calendarEvents);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }, [view, currentDate, selectedProvider]);

  const fetchProviders = useCallback(async () => {
    try {
      const data = await providerService.getProviders();
      onProviderChange(data[0].id);
    } catch (err) {
      setError('Failed to load providers');
    }
  }, [onProviderChange]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, selectedProvider]);

  const handleNavigate = useCallback((action: 'PREV' | 'NEXT' | 'TODAY' | Date) => {
    if (action === 'PREV') {
      const newDate = view === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
      // Only update if new date is not before creation date
      if (!isBefore(startOfMonth(newDate), startOfMonth(new Date(user?.createdAt || '')))) {
        setCurrentDate(newDate);
      }
    } else if (action === 'NEXT') {
      setCurrentDate(prev => view === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1));
    } else if (action === 'TODAY') {
      const now = new Date();
      setCurrentDate(setMinutes(setHours(now, now.getHours()), 0));
    } else {
      // Only update if selected date is not before creation date
      if (!isBefore(startOfMonth(action), startOfMonth(new Date(user?.createdAt || '')))) {
        // Ensure the time is set to the start of an hour
        setCurrentDate(setMinutes(action, 0));
      }
    }
  }, [view, currentDate, user?.createdAt]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    // Ensure selected times are on the hour
    const start = setMinutes(slotInfo.start, 0);
    const end = setMinutes(new Date(start.getTime() + 60 * 60 * 1000), 0); // Add 1 hour

    // Check if selection is within business hours
    const isBusinessHours = isWithinInterval(start, {
      start: setHours(start, BUSINESS_HOURS.start),
      end: setHours(start, BUSINESS_HOURS.end)
    });

    if (!isBusinessHours) {
      const confirmAfterHours = window.confirm(
        "You're selecting an after-hours time slot.\n\n" +
        "While we offer 24-hour support, please note:\n" +
        "• Limited provider availability outside 9 AM - 5 PM\n" +
        "• Emergency cases should contact healthcare providers or 911\n" +
        "• For non-emergencies, consider reaching out via Discord or social media\n\n" +
        "Would you like to proceed with scheduling this after-hours session?"
      );
      if (!confirmAfterHours) return;
    }

    onSelectSlot({ start, end });
  };

  // Generate array of years for the dropdown (from user creation year to current year + 2)
  const currentYear = new Date().getFullYear();
  const startYear = user?.createdAt ? parseISO(user.createdAt).getFullYear() : currentYear;
  const years = Array.from(
    { length: currentYear - startYear + 3 }, 
    (_, i) => startYear + i
  );

  // Generate array of months for the dropdown
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2000, i, 1), 'MMMM')
  })).filter(month => {
    const userCreatedAt = user?.createdAt ? parseISO(user.createdAt) : null;
    if (!userCreatedAt) return true;
    if (currentDate.getFullYear() === userCreatedAt.getFullYear()) {
      return month.value >= userCreatedAt.getMonth();
    }
    return true;
  });

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#9575CD'; // Default purple for scheduled
    
    switch (event.status.toUpperCase()) {
      case 'COMPLETED':
        backgroundColor = '#81C784'; // Green
        break;
      case 'CANCELLED':
        backgroundColor = '#E57373'; // Red
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  // Disable the previous button if we're at the creation month
  const isPrevDisabled = isBefore(
    startOfMonth(
      view === 'month' 
        ? subMonths(currentDate, 1) 
        : subWeeks(currentDate, 1)
    ),
    startOfMonth(new Date(user?.createdAt || ''))
  );

  // Format times to show only hours
  const formats = {
    timeGutterFormat: (date: Date) => format(date, 'HH:00'),
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${format(start, 'HH:00')} - ${format(end, 'HH:00')}`,
    selectRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${format(start, 'HH:00')} - ${format(end, 'HH:00')}`,
  };

  // Style slots based on time of day
  const slotPropGetter = (date: Date) => {
    const hour = date.getHours();
    const isBusinessHour = hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
    
    return {
      className: isBusinessHour ? 'business-hours' : 'after-hours',
      style: {
        backgroundColor: isBusinessHour ? 'rgba(255, 255, 255, 0.9)' : 'rgba(243, 244, 246, 0.7)',
      }
    };
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as 'month' | 'week' | 'day')}
            className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          
          <select
            value={selectedProvider}
            onChange={(e) => onProviderChange(Number(e.target.value))}
            className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
          >
            <option value="">All Providers</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.firstName} {provider.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleNavigate('PREV')}
            disabled={isPrevDisabled}
            className={`p-2 transition-colors ${
              isPrevDisabled 
                ? 'text-brown-dark/40 cursor-not-allowed' 
                : 'text-brown-dark hover:text-purple'
            }`}
            aria-label="Previous"
          >
            ←
          </button>

          <button
            onClick={() => handleNavigate('TODAY')}
            className="px-3 py-1 text-sm text-brown-dark hover:text-purple transition-colors"
          >
            Today
          </button>

          <button
            onClick={() => handleNavigate('NEXT')}
            className="p-2 text-brown-dark hover:text-purple transition-colors"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[600px] bg-white/50 rounded">
          <div className="text-brown-dark">Loading appointments...</div>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          onView={(newView) => setView(newView as 'month' | 'week' | 'day')}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={onSelectEvent}
          selectable
          eventPropGetter={eventStyleGetter}
          slotPropGetter={slotPropGetter}
          formats={formats}
          className="bg-white/50 rounded shadow-sm"
        />
      )}
    </div>
  );
}; 