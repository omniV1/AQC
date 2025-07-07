import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthProvider, { useAuth } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

// --- Mock AuthService ----------------------------------------------------------------
jest.mock('../../services/authService', () => {
  const mockUser = {
    id: '1',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'CLIENT',
  };
  return {
    AuthService: {
      getInstance: () => ({
        registerClient: jest.fn().mockResolvedValue({
          user: mockUser,
          token: 'access123',
          refreshToken: 'refresh123',
        }),
        clientLogin: jest.fn().mockResolvedValue({
          user: mockUser,
          token: 'access123',
          refreshToken: 'refresh123',
        }),
        getCurrentUser: jest.fn().mockResolvedValue(mockUser),
      }),
    },
  };
});

// --- Helper component ----------------------------------------------------------------
function AuthStatus() {
  const { isAuthenticated, clientLogin, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'auth' : 'guest'}</span>
      <button onClick={() => clientLogin({ email: 'jane@example.com', password: 'Password123' })}>
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

// --------------------------------------------------------------------------------------

describe('AuthContext smoke flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('logs in and logs out successfully', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthStatus />
        </AuthProvider>
      </MemoryRouter>
    );

    // Initially guest
    expect(screen.getByTestId('auth-status')).toHaveTextContent('guest');

    // Click login
    fireEvent.click(screen.getByText('login'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('auth');
    });

    // Tokens saved
    expect(localStorage.getItem('token')).toBe('access123');
    expect(localStorage.getItem('refreshToken')).toBe('refresh123');

    // Logout
    fireEvent.click(screen.getByText('logout'));
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('guest');
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
}); 