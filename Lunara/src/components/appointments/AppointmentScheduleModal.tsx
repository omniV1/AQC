import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SupportProvider {
  id: number;
  firstName: string;
  lastName: string;
}

interface SupportSessionScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (sessionData: CreateSupportSessionRequest) => Promise<void>;
  providers: SupportProvider[];
  initialStartTime?: Date;
  initialEndTime?: Date;
}

interface CreateSupportSessionRequest {
  providerId: number;
  startTime: string;
  endTime: string;
  notes: string;
  location: string;
}

export const AppointmentScheduleModal: React.FC<SupportSessionScheduleModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
  providers,
  initialStartTime,
  initialEndTime
}) => {
  const [formData, setFormData] = useState<CreateSupportSessionRequest>({
    providerId: 0,
    startTime: initialStartTime ? initialStartTime.toISOString().slice(0, 16) : '',
    endTime: initialEndTime ? initialEndTime.toISOString().slice(0, 16) : '',
    location: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && providers.length > 0) {
      setFormData(prev => ({
        ...prev,
        providerId: providers[0].id,
        startTime: initialStartTime ? initialStartTime.toISOString().slice(0, 16) : prev.startTime,
        endTime: initialEndTime ? initialEndTime.toISOString().slice(0, 16) : prev.endTime
      }));
    }
  }, [isOpen, providers, initialStartTime, initialEndTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSchedule(formData);
      onClose();
    } catch (err) {
      setError('Failed to schedule support session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'providerId' ? parseInt(value, 10) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cream rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-serif text-forest-green mb-6">Schedule Support Session</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="providerId" className="block text-sm font-medium text-brown mb-1">
              Support Provider
            </label>
            <select
              id="providerId"
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            >
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.firstName} {provider.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-brown mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-brown mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-brown mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location or 'Virtual Meeting Room'"
              required
              className="w-full px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-brown mb-1">
              Support Needs
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Describe what kind of support you're looking for"
              rows={3}
              className="w-full px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-brown-dark hover:text-brown-dark/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple hover:bg-purple/80 text-white rounded transition-colors disabled:opacity-50"
            >
              Schedule Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 