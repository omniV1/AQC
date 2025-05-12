import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/models';
import { ApiClient } from './apiClient';

const apiClient = ApiClient.getInstance();

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>('/auth/authenticate', credentials);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>('/auth/register', data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  async getProfile(): Promise<{ user: User }> {
    try {
      return await apiClient.get<{ user: User }>('/auth/me');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  },
}; 