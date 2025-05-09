import axios from 'axios';
import { format } from 'date-fns';
import { ApiClient } from '../api/apiClient';

// Use the singleton ApiClient instance instead of creating a new one
const api = ApiClient.getInstance().getAxiosInstance();

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

export interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  providerId: number;
  providerName: string;
  status: string;
  location: string;
}

export interface ProviderAvailability {
  providerId: number;
  providerName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface CreateAppointmentRequest {
  providerId: number;
  startTime: string;
  endTime: string;
  notes?: string;
  location?: string;
}

export const fetchAppointments = async (startDate: Date, endDate: Date): Promise<Appointment[]> => {
  const response = await api.get('/appointments', {
    params: {
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
    },
  });
  return response.data;
};

export const fetchProviderAvailability = async (
  providerId: number,
  startDate: Date,
  endDate: Date
): Promise<ProviderAvailability[]> => {
  const response = await api.get(`/appointments/providers/${providerId}/availability`, {
    params: {
      startDate: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
    },
  });
  return response.data;
};

export const createAppointment = async (request: CreateAppointmentRequest): Promise<Appointment> => {
  const response = await api.post('/appointments', request);
  return response.data;
};

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
  await api.post(`/appointments/${appointmentId}/cancel`);
}; 