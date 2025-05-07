import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, addMonths, subMonths, addWeeks, subWeeks, parseISO, isBefore, startOfMonth, setHours, setMinutes, isWithinInterval } from 'date-fns';
import { parse } from 'date-fns';
import { startOfWeek } from 'date-fns';
import { getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

interface AppointmentCalendarProps {
  sessions: CalendarEvent[];
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  providers: SupportProvider[];
  selectedProvider?: number;
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
    // Initialize with user's creation date if available, otherwise use current date
    const date = user?.createdAt ? parseISO(user.createdAt) : new Date();
    // Set time to the start of the current hour
    return setMinutes(setHours(date, date.getHours()), 0);
  });

  const creationDate = user?.createdAt ? parseISO(user.createdAt) : new Date();

  const handleNavigate = useCallback((action: 'PREV' | 'NEXT' | 'TODAY' | Date) => {
    if (action === 'PREV') {
      const newDate = view === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
      // Only update if new date is not before creation date
      if (!isBefore(startOfMonth(newDate), startOfMonth(creationDate))) {
        setCurrentDate(newDate);
      }
    } else if (action === 'NEXT') {
      setCurrentDate(prev => view === 'month' ? addMonths(prev, 1) : addWeeks(prev, 1));
    } else if (action === 'TODAY') {
      const now = new Date();
      setCurrentDate(setMinutes(setHours(now, now.getHours()), 0));
    } else {
      // Only update if selected date is not before creation date
      if (!isBefore(startOfMonth(action), startOfMonth(creationDate))) {
        // Ensure the time is set to the start of an hour
        setCurrentDate(setMinutes(action, 0));
      }
    }
  }, [view, currentDate, creationDate]);

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
    // If it's the creation year, only show months from creation date onwards
    if (currentDate.getFullYear() === startYear) {
      return month.value >= creationDate.getMonth();
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
    startOfMonth(creationDate)
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

          <div className="flex items-center space-x-2">
            <select
              value={currentDate.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(e.target.value));
                handleNavigate(newDate);
              }}
              className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <select
              value={currentDate.getFullYear()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setFullYear(parseInt(e.target.value));
                handleNavigate(newDate);
              }}
              className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleNavigate('NEXT')}
            className="p-2 text-brown-dark hover:text-purple transition-colors"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="h-[600px] bg-white rounded-lg shadow">
          <Calendar
            localizer={localizer}
            events={sessions}
            startAccessor="start"
            endAccessor="end"
            view={view}
            date={currentDate}
            onNavigate={handleNavigate}
            onView={(newView: View) => setView(newView as 'month' | 'week' | 'day')}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventStyleGetter}
            slotPropGetter={slotPropGetter}
            tooltipAccessor={(event: CalendarEvent) => `${event.title}\nLocation: ${event.location}${event.notes ? `\nNotes: ${event.notes}` : ''}`}
            defaultView="week"
            step={60}
            timeslots={1}
            formats={formats}
            dayLayoutAlgorithm="no-overlap"
          />
        </div>

        {/* After-hours info banner */}
        <div className="mt-4 p-4 bg-purple/10 rounded-lg text-sm text-brown-dark">
          <h4 className="font-medium mb-2">24/7 Support Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-purple mb-1">Business Hours (9 AM - 5 PM)</h5>
              <p>Full availability for scheduled support sessions</p>
            </div>
            <div>
              <h5 className="font-medium text-purple mb-1">After Hours</h5>
              <p>Limited availability. For emergencies, contact healthcare providers or 911.</p>
              <p className="mt-1">For non-emergencies, reach out via:</p>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Discord</li>
                <li>Social Media</li>
                <li>Email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 