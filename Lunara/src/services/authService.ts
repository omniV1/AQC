import { ApiClient } from '../api/apiClient';
import { 
    LoginRequest, 
    LoginResponse, 
    RefreshTokenRequest, 
    RefreshTokenResponse 
} from '../types/api';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/models';
import { CreateClientRequest } from '../types/provider';

/**
 * Service for handling authentication-related operations
 */
export class AuthService {
    private static instance: AuthService;
    private api: ApiClient;

    private constructor() {
        this.api = ApiClient.getInstance();
    }

    /**
     * Get singleton instance of AuthService
     */
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * Provider login
     * @param credentials - Login credentials
     * @returns Login response with tokens and user info
     */
    public async providerLogin(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            console.log('Attempting provider login:', { email: credentials.email });
            const response = await this.api.post<LoginResponse>('/auth/authenticate', credentials);
            console.log('Login successful, storing auth data');
            this.handleAuthResponse(response);
            return response;
        } catch (error) {
            console.error('Provider login failed:', error);
            throw error;
        }
    }

    /**
     * Client login
     * @param credentials - Login credentials
     * @returns Login response with tokens and user info
     */
    public async clientLogin(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await this.api.post<LoginResponse>('/auth/authenticate', credentials);
        this.handleAuthResponse(response);
        return response;
    }

    /**
     * Refresh authentication token
     * @returns New access token
     */
    public async refreshToken(): Promise<RefreshTokenResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const request: RefreshTokenRequest = { refreshToken };
        const response = await this.api.post<RefreshTokenResponse>('/auth/refresh', request);
        
        localStorage.setItem('token', response.token);
        return response;
    }

    /**
     * Logout user
     */
    public async logout(): Promise<void> {
        try {
            await this.api.post('/auth/logout', {});
        } finally {
            this.clearAuthData();
        }
    }

    /**
     * Store authentication data in localStorage
     * @param response - Login response containing tokens and user info
     */
    private handleAuthResponse(response: LoginResponse): void {
        if (!response.token) {
            console.error('No token received in authentication response');
            throw new Error('No token received in authentication response');
        }
        console.log('Storing authentication token');
        localStorage.setItem('token', response.token);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }
    }

    /**
     * Clear authentication data from localStorage
     */
    private clearAuthData(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    // Provider registration
    async registerProvider(providerData: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        registrationCode: string;
    }): Promise<AuthResponse> {
        try {
            console.log('Sending registration request:', {
                ...providerData,
                password: '[REDACTED]'
            });
            const response = await this.api.post<{ data: AuthResponse }>('/auth/register/provider', providerData);
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
    }

    // Client registration (provider only)
    async registerClient(clientData: CreateClientRequest): Promise<AuthResponse> {
        try {
            console.log('Attempting to register client:', { email: clientData.email });
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found. Please log in again.');
            }
            const response = await this.api.post<AuthResponse>('/auth/register/client', clientData);
            console.log('Client registration successful');
            return response;
        } catch (error: any) {
            console.error('Client registration failed:', error.response?.data || error.message);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser(): Promise<User> {
        const response = await this.api.get<User>('/auth/me');
        return response;
    }

    // Request password reset
    async requestPasswordReset(email: string): Promise<void> {
        await this.api.post('/auth/password-reset-request', { email });
    }

    // Reset password
    async resetPassword(token: string, newPassword: string): Promise<void> {
        await this.api.post('/auth/password-reset', { token, newPassword });
    }

    // Update password
    async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
        await this.api.post('/auth/password-update', { currentPassword, newPassword });
    }
} 