import React, { useState } from 'react';
import { CreateClientRequest } from '../../types/provider';

interface AddClientFormProps {
  onSubmit: (client: CreateClientRequest) => Promise<void>;
  onCancel: () => void;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateClientRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    deliveryDate: '',
    deliveryType: 'VAGINAL',
    complications: '',
    supportPreferences: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      await onSubmit(formData);
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
          <label htmlFor="birthDate" className="block text-sm font-medium text-warm-brown">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-warm-brown">
            Delivery Date
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          />
        </div>

        <div>
          <label htmlFor="deliveryType" className="block text-sm font-medium text-warm-brown">
            Delivery Type
          </label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-warm-brown/20 rounded-md shadow-sm focus:outline-none focus:ring-sage focus:border-sage"
          >
            <option value="VAGINAL">Vaginal Birth</option>
            <option value="C_SECTION">C-Section</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="complications" className="block text-sm font-medium text-warm-brown">
            Complications (if any)
          </label>
          <textarea
            id="complications"
            name="complications"
            value={formData.complications}
            onChange={handleChange}
            rows={3}
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