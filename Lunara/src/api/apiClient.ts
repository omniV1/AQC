import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorHandler } from './errorHandler';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Singleton class for managing API requests
 * Handles:
 * - Request/response interceptors
 * - Authentication
 * - Error handling
 * - Request retrying
 * - Response caching
 */
export class ApiClient {
    private static instance: ApiClient;
    protected axiosInstance: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }>;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        this.cache = new Map();
        this.setupInterceptors();
    }

    /**
     * Get singleton instance of ApiClient
     */
    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                    console.log('Adding token to request:', config.url);
                }
                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.error('Response error:', error.response?.status, error.response?.data);
                
                if (error.response?.status === 401) {
                    console.log('Unauthorized error, attempting token refresh...');
                    await this.handleTokenExpiration();
                } else if (error.response?.status === 403) {
                    console.error('Forbidden error. User may not have required permissions.');
                    // You might want to redirect to an error page or show a message
                }
                return Promise.reject(error);
            }
        );
    }

    private async handleTokenExpiration(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const response = await this.axiosInstance.post('/auth/refresh', { refreshToken });
                localStorage.setItem('token', response.data.token);
                return;
            } catch (error) {
                this.handleLogout();
            }
        }
        this.handleLogout();
    }

    private handleLogout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }

    /**
     * Make GET request with caching
     */
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const cacheKey = url + JSON.stringify(config?.params || {});
        const cachedData = this.cache.get(cacheKey);
        
        if (cachedData && Date.now() - cachedData.timestamp < this.CACHE_DURATION) {
            return cachedData.data;
        }

        try {
            const response = await this.axiosInstance.get<T>(url, config);
            this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Make POST request
     */
    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server Error Response:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
                throw error;
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No Response Received:', error.request);
                throw new Error('No response received from server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request Setup Error:', error.message);
                throw error;
            }
        }
    }

    /**
     * Make PUT request
     */
    public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Make PATCH request
     */
    public async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.patch<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Clear the request cache
     * Useful for testing and when user logs out
     */
    public clearCache(): void {
        this.cache.clear();
    }

    /**
     * Make DELETE request
     */
    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.delete<T>(url, config);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    // Add getter for axios instance
    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
} 