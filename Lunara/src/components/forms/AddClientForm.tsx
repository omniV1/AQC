import React, { useState } from 'react';
import { CreateClientRequest, BirthType, FeedingStyle } from '../../types/provider';

interface AddClientFormProps {
  onSubmit: (client: CreateClientRequest) => Promise<void>;
  onCancel: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dueDate: string;
  birthDate: string;
  birthType: BirthType | undefined;
  feedingStyle: FeedingStyle | undefined;
  birthLocation: string;
  supportSystem: string;
  concerns: string;
  goals: string;
};

export const AddClientForm: React.FC<AddClientFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dueDate: '',
    birthDate: '',
    birthType: undefined,
    feedingStyle: undefined,
    birthLocation: '',
    supportSystem: '',
    concerns: '',
    goals: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Convert empty strings to undefined for optional fields and remove confirmPassword
      const clientData: CreateClientRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        dueDate: formData.dueDate || undefined,
        birthDate: formData.birthDate || undefined,
        birthType: formData.birthType || undefined,
        feedingStyle: formData.feedingStyle || undefined,
        birthLocation: formData.birthLocation?.trim() || undefined,
        supportSystem: formData.supportSystem?.trim() || undefined,
        concerns: formData.concerns?.trim() || undefined,
        goals: formData.goals?.trim() || undefined
      };

      await onSubmit(clientData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-warm-brown">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-warm-brown">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-warm-brown">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-warm-brown">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-warm-brown">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-warm-brown">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-warm-brown">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="birthType" className="block text-sm font-medium text-warm-brown">
            Birth Type
          </label>
          <select
            id="birthType"
            name="birthType"
            value={formData.birthType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          >
            <option value="">Select birth type...</option>
            {Object.values(BirthType).map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="feedingStyle" className="block text-sm font-medium text-warm-brown">
            Feeding Style
          </label>
          <select
            id="feedingStyle"
            name="feedingStyle"
            value={formData.feedingStyle}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          >
            <option value="">Select feeding style...</option>
            {Object.values(FeedingStyle).map((style) => (
              <option key={style} value={style}>
                {style.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="birthLocation" className="block text-sm font-medium text-warm-brown">
            Birth Location
          </label>
          <input
            type="text"
            id="birthLocation"
            name="birthLocation"
            value={formData.birthLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="supportSystem" className="block text-sm font-medium text-warm-brown">
            Support System
          </label>
          <textarea
            id="supportSystem"
            name="supportSystem"
            value={formData.supportSystem}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="concerns" className="block text-sm font-medium text-warm-brown">
            Concerns
          </label>
          <textarea
            id="concerns"
            name="concerns"
            value={formData.concerns}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="goals" className="block text-sm font-medium text-warm-brown">
            Goals
          </label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-warm-brown/20 text-warm-brown rounded-lg hover:bg-warm-brown/5 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Client'}
        </button>
      </div>
    </form>
  );
}; 