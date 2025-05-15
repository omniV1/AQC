import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, LoginCredentials, ProviderRegistrationData, ClientRegistrationData } from '../types/models';
import { AuthContextType, AuthResponse } from '../types/auth';
import { AuthService } from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authService = AuthService.getInstance();

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for stored auth token and validate it
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const user = await authService.getCurrentUser();
                    setUser(user);
                }
            } catch (err) {
                console.error('Auth validation failed:', err);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleAuthResponse = (token: string, user: User) => {
        localStorage.setItem('token', token);
        setUser(user);
        setError(null);
    };

    const registerProvider = async (data: ProviderRegistrationData): Promise<AuthResponse> => {
        try {
            const response = await authService.registerProvider(data);
            handleAuthResponse(response.token, response.user);
            toast.success('Registration successful! Welcome to Lunara.');
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(errorMessage);
            throw error;
        }
    };

    const registerClient = async (data: ClientRegistrationData): Promise<AuthResponse> => {
        try {
            const response = await authService.registerClient(data);
            handleAuthResponse(response.token, response.user);
            toast.success('Client registered successfully!');
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Client registration failed';
            toast.error(errorMessage);
            throw error;
        }
    };

    const providerLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await authService.providerLogin(credentials);
            handleAuthResponse(response.token, response.user);
            toast.success('Login successful! Welcome back.');
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMessage);
            throw error;
        }
    };

    const clientLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await authService.clientLogin(credentials);
            handleAuthResponse(response.token, response.user);
            toast.success('Login successful! Welcome back.');
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            toast.error(errorMessage);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
        toast.info('You have been logged out.');
    };

    const clearError = () => setError(null);

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        isProvider: user?.role === 'PROVIDER',
        isClient: user?.role === 'CLIENT',
        isAdmin: user?.role === 'ADMIN',
        registerProvider,
        registerClient,
        providerLogin,
        clientLogin,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider; 