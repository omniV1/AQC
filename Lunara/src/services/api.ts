import { ApiClient } from '../api/apiClient';
import { Appointment, ProviderAvailability, QueryParams } from '../types/api';
import { format } from 'date-fns';

const apiClient = ApiClient.getInstance();

export const fetchAppointments = async (startDate: Date, endDate: Date): Promise<Appointment[]> => {
  // Assuming your backend expects dates in 'yyyy-MM-dd' format or similar
  // And that there's an endpoint that can filter by a date range.
  // This is a placeholder, you'll need to adjust the endpoint and params.
  const params: QueryParams = {
    // Convert Date objects to string representations as needed by your API
    startDate: format(startDate, 'yyyy-MM-dd'), 
    endDate: format(endDate, 'yyyy-MM-dd'),
  };
  const queryString = new URLSearchParams(params as any).toString();
  // Replace '/appointments/calendar' with your actual endpoint for fetching appointments for a calendar view
  return apiClient.get<Appointment[]>(`/appointments/calendar?${queryString}`);
};

export const fetchProviderAvailability = async (providerId: number, startDate: Date, endDate: Date): Promise<ProviderAvailability[]> => {
  // This is a placeholder. You might need to adjust based on how your API handles provider availability fetching with date ranges.
  // If the backend GET /providers/{providerId}/availability doesn't accept date ranges,
  // you might fetch all and filter, or this might need a different endpoint.
  const params: QueryParams = {
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
  };
  const queryString = new URLSearchParams(params as any).toString();
  // Replace with your actual endpoint for provider availability in a range
  return apiClient.get<ProviderAvailability[]>(`/providers/${providerId}/availability/calendar?${queryString}`); 
}; 