/**
 * AuthService (Sprint-1 scaffold)
 * --------------------------------------------------
 * This file REPLACES the disabled version at
 * `src/services/authService.ts.disabled` once implemented.
 *
 * TODO (Carter):
 * 1. Instantiate a shared axios client (see `src/services/api.ts`).
 * 2. Implement the following methods:
 *    - registerClient
 *    - registerProvider
 *    - login
 *    - refreshToken
 *    - logout
 * 3. Persist `accessToken` & `refreshToken` in localStorage or cookies.
 * 4. Add axios interceptors to inject Authorization header & handle 401.
 * 5. Export a singleton instance similar to other Service classes.
 *
 * Backend Endpoints reference:
 *  POST /api/auth/register
 *  POST /api/auth/login
 *  POST /api/auth/refresh
 *  POST /api/auth/logout
 */

import { ApiClient } from '../api/apiClient';
import { User, LoginCredentials, ProviderRegistrationData, ClientRegistrationData } from '../types/models';
import { AuthResponse } from '../types/auth';

export class AuthService {
  // Singleton pattern
  private static _instance: AuthService | null = null;

  private readonly api = ApiClient.getInstance();

  static getInstance(): AuthService {
    if (!this._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  private constructor() {}

  // --- Public API --------------------------------------------------

  async registerClient(data: ClientRegistrationData): Promise<AuthResponse> {
    // Backend expects role to be either `client` or `provider`
    await this.api.post('/auth/register', { ...data, role: 'client' });
    // Auto-login immediately after successful registration
    return this.login({ email: data.email, password: data.password });
  }

  async registerProvider(data: ProviderRegistrationData): Promise<AuthResponse> {
    await this.api.post('/auth/register', { ...data, role: 'provider' });
    return this.login({ email: data.email, password: data.password });
  }

  async clientLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.login(credentials);
  }

  async providerLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.login(credentials);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await this.api.post<{
      success: boolean;
      data: { user: User; accessToken: string; refreshToken: string };
    }>('/auth/login', credentials);

    const { user, accessToken, refreshToken } = res.data.data;

    // Persist tokens for subsequent requests
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return {
      user,
      token: accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const res = await this.api.post<{ success: boolean; data: { accessToken: string } }>('/auth/refresh', { refreshToken });
    const newToken = res.data.data.accessToken;
    localStorage.setItem('token', newToken);
    return newToken;
  }

  async getCurrentUser(): Promise<User> {
    const res = await this.api.get<{ user: User }>(
      '/users/profile',
    );
    return (res as any).user ?? res; // handle both wrapped and plain responses
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
} 