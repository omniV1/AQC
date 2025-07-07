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

export class AuthService {
  // Singleton pattern
  private static _instance: AuthService | null = null;

  static getInstance(): AuthService {
    if (!this._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  private constructor() {
    // TODO: Initialise axios client here
  }

  // --- Methods to implement ---
  /*
  async registerClient(data: ClientRegistrationData): Promise<AuthResponse> {}
  async registerProvider(data: ProviderRegistrationData): Promise<AuthResponse> {}
  async login(credentials: LoginCredentials): Promise<AuthResponse> {}
  async refreshToken(refreshToken: string): Promise<string> {}
  logout(): void {}
  */
} 