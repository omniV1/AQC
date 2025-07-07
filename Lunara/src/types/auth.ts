import { User, LoginCredentials, ProviderRegistrationData, ClientRegistrationData } from './models';

// Re-export types from models
export type { LoginCredentials, ProviderRegistrationData, ClientRegistrationData };

export interface AuthResponse {
  user: User;
  token: string; // access token
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isProvider: boolean;
  isClient: boolean;
  isAdmin: boolean;
  clientLogin: (credentials: LoginCredentials) => Promise<AuthResponse>;
  providerLogin: (credentials: LoginCredentials) => Promise<AuthResponse>;
  registerProvider: (data: ProviderRegistrationData) => Promise<AuthResponse>;
  registerClient: (data: ClientRegistrationData) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
} 