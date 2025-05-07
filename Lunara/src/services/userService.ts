import axiosInstance from './axiosConfig';
import { User, UserProfile } from '../types/user';

export const userService = {
    async getClients(): Promise<User[]> {
        try {
            const response = await axiosInstance.get('/users/clients');
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    },

    async getClientProfile(clientId: string): Promise<UserProfile> {
        try {
            const response = await axiosInstance.get(`/users/clients/${clientId}/profile`);
            return response.data;
        } catch (error) {
            console.error('Error fetching client profile:', error);
            throw error;
        }
    },

    async updateClientProfile(clientId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
        try {
            const response = await axiosInstance.put(`/users/clients/${clientId}/profile`, profile);
            return response.data;
        } catch (error) {
            console.error('Error updating client profile:', error);
            throw error;
        }
    },

    async getCurrentUser(): Promise<User> {
        try {
            const response = await axiosInstance.get('/users/me');
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    }
}; 