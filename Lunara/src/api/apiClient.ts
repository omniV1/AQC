import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ErrorHandler } from './errorHandler';

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
    private axiosInstance: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }>;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
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
     * Handles:
     * - Token injection
     * - Response error handling
     * - Token refresh
     */
    private setupInterceptors(): void {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    await this.handleTokenExpiration();
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * Handle expired token by refreshing or logging out
     */
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

    /**
     * Clear auth tokens and redirect to login
     */
    private handleLogout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }

    /**
     * Make GET request with caching
     */
    public async get<T>(url: string, cacheDuration?: number): Promise<T> {
        const cacheKey = url;
        const cachedData = this.cache.get(cacheKey);
        
        if (cachedData && Date.now() - cachedData.timestamp < (cacheDuration || this.CACHE_DURATION)) {
            return cachedData.data;
        }

        try {
            const response = await this.axiosInstance.get<T>(url);
            this.cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Make POST request
     */
    public async post<T>(url: string, data: any): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>(url, data);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Make PUT request
     */
    public async put<T>(url: string, data: any): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(url, data);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }

    /**
     * Make DELETE request
     */
    public async delete<T>(url: string): Promise<T> {
        try {
            const response = await this.axiosInstance.delete<T>(url);
            return response.data;
        } catch (error) {
            throw ErrorHandler.handle(error);
        }
    }
} 