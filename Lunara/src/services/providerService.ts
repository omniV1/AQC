import axios from 'axios';
import { Provider, CreateProviderRequest, UpdateProviderRequest } from '../types/provider';

const API_URL = '/api/providers';

export const providerService = {
    async getAll(): Promise<Provider[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async getById(id: string): Promise<Provider> {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    async create(provider: CreateProviderRequest): Promise<Provider> {
        const response = await axios.post(API_URL, provider);
        return response.data;
    },

    async update(id: string, provider: UpdateProviderRequest): Promise<Provider> {
        const response = await axios.put(`${API_URL}/${id}`, provider);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 