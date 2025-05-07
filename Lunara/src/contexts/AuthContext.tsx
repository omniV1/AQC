import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData } from '../types/models';
import { AuthContextType } from '../types/auth';
import { authService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const user = await authService.getCurrentUser();
                    setUser(user);
                }
            } catch (err) {
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const handleAuthResponse = (token: string, user: User) => {
        localStorage.setItem('token', token);
        setUser(user);
        setError(null);
    };

    const providerLogin = async (credentials: LoginCredentials) => {
        try {
            const { token, user } = await authService.providerLogin(credentials);
            handleAuthResponse(token, user);
        } catch (err) {
            setError('Invalid provider credentials');
            throw err;
        }
    };

    const clientLogin = async (credentials: LoginCredentials) => {
        try {
            const { token, user } = await authService.clientLogin(credentials);
            handleAuthResponse(token, user);
        } catch (err) {
            setError('Invalid client credentials');
            throw err;
        }
    };

    const registerProvider = async (data: { 
        email: string; 
        firstName: string; 
        lastName: string; 
        password: string;
        registrationCode: string;
    }) => {
        try {
            await authService.registerProvider(data);
            setError(null);
        } catch (err) {
            setError('Failed to register provider');
            throw err;
        }
    };

    const registerClient = async (data: RegisterData & { providerId: number }) => {
        try {
            await authService.registerClient(data);
            setError(null);
        } catch (err) {
            setError('Failed to register client');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('token');
            setUser(null);
            setError(null);
        } catch (err) {
            setError('Failed to logout');
            throw err;
        }
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
        providerLogin,
        clientLogin,
        registerProvider,
        registerClient,
        logout,
        clearError
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
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