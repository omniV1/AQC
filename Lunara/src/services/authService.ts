import axios from 'axios';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/models';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const authService = {
    // Provider login
    providerLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`${API_URL}/auth/authenticate`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Login failed. Please try again.');
        }
    },

    // Client login
    clientLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`${API_URL}/auth/authenticate`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Login failed. Please try again.');
        }
    },

    // Provider registration
    registerProvider: async (providerData: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        registrationCode: string;
    }): Promise<AuthResponse> => {
        try {
            console.log('Sending registration request:', {
                ...providerData,
                password: '[REDACTED]'
            });
            const response = await axios.post(`${API_URL}/auth/register/provider`, providerData);
            return response.data;
        } catch (error: any) {
            console.error('Registration error details:', error.response?.data);
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            } else if (error.response?.data?.errors) {
                const messages = Object.values(error.response.data.errors).join(', ');
                throw new Error(`Validation failed: ${messages}`);
            }
            throw new Error('Registration failed. Please try again.');
        }
    },

    // Client registration (provider only)
    registerClient: async (clientData: RegisterData & { providerId: number }): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/auth/register/client`, clientData);
        return response.data;
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await axios.get(`${API_URL}/auth/me`);
        return response.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        await axios.post(`${API_URL}/auth/logout`);
    },

    // Request password reset
    requestPasswordReset: async (email: string): Promise<void> => {
        await axios.post(`${API_URL}/auth/password-reset-request`, { email });
    },

    // Reset password
    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        await axios.post(`${API_URL}/auth/password-reset`, { token, newPassword });
    },

    // Update password
    updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        await axios.post(`${API_URL}/auth/password-update`, { currentPassword, newPassword });
    }
}; 