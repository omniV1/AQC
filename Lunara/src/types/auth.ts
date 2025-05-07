import { User, LoginCredentials, RegisterData } from './models';

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    isProvider: boolean;
    isClient: boolean;
    isAdmin: boolean;
    providerLogin: (credentials: LoginCredentials) => Promise<void>;
    clientLogin: (credentials: LoginCredentials) => Promise<void>;
    registerProvider: (data: { 
        email: string; 
        firstName: string; 
        lastName: string; 
        password: string;
        registrationCode: string;
    }) => Promise<void>;
    registerClient: (data: RegisterData & { providerId: number }) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
} 