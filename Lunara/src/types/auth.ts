import { User, LoginCredentials, ProviderRegistrationData, ClientRegistrationData } from './models';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isProvider: boolean;
  isClient: boolean;
  isAdmin: boolean;
  providerLogin: (credentials: LoginCredentials) => Promise<AuthResponse>;
  clientLogin: (credentials: LoginCredentials) => Promise<AuthResponse>;
  registerProvider: (data: ProviderRegistrationData) => Promise<AuthResponse>;
  registerClient: (data: ClientRegistrationData) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
} 