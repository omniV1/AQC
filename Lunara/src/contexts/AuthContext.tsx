import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, LoginCredentials, RegisterData, UserProfile } from '../types/auth';
import { authApi } from '../api/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'lunara_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await authApi.getProfile(token);
      setUser(response.user);
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await fetchUserProfile(token);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    localStorage.setItem(TOKEN_KEY, response.token);
    await fetchUserProfile(response.token);
  };

  const register = async (data: RegisterData) => {
    const response = await authApi.register(data);
    localStorage.setItem(TOKEN_KEY, response.token);
    await fetchUserProfile(response.token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 