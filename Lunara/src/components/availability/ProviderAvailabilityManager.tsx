import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';

interface Availability {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailabilityRequest {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const ProviderAvailabilityManager: React.FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await fetch('/api/v1/availability', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();
      setAvailabilities(data);
    } catch (err) {
      setError('Failed to load availability schedule');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvailability = async (dayOfWeek: number, request: AvailabilityRequest) => {
    try {
      const response = await fetch(`/api/v1/availability/${dayOfWeek}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      const updatedAvailability = await response.json();
      setAvailabilities(prev =>
        prev.map(a => a.dayOfWeek === dayOfWeek ? updatedAvailability : a)
      );
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <p className="text-brown">Loading availability schedule...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-forest-green mb-6">Weekly Availability</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded text-red-700 text-center">
          {error}
        </div>
      )}

      {DAYS_OF_WEEK.map((day, index) => {
        const availability = availabilities.find(a => a.dayOfWeek === index) || {
          dayOfWeek: index,
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true
        };

        return (
          <Card key={day} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-brown mb-2">{day}</h3>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm text-brown-dark mb-1">Start Time</label>
                    <input
                      type="time"
                      value={availability.startTime}
                      onChange={(e) => updateAvailability(index, {
                        ...availability,
                        startTime: e.target.value
                      })}
                      className="px-2 py-1 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brown-dark mb-1">End Time</label>
                    <input
                      type="time"
                      value={availability.endTime}
                      onChange={(e) => updateAvailability(index, {
                        ...availability,
                        endTime: e.target.value
                      })}
                      className="px-2 py-1 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability.isAvailable}
                    onChange={(e) => updateAvailability(index, {
                      ...availability,
                      isAvailable: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-brown/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
                  <span className="ml-3 text-sm font-medium text-brown-dark">Available</span>
                </label>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}; 