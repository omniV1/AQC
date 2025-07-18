import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui/Spinner';

interface ProtectedRouteProps {
    children: React.ReactElement;
    allowedRoles: ('CLIENT' | 'PROVIDER' | 'ADMIN')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    console.log('ProtectedRoute Debug:', {
        isAuthenticated,
        user,
        allowedRoles,
        currentRole: user?.role
    });

    if (loading) {
        return <Spinner />;
    }

    if (!isAuthenticated || !user) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // If user is not authorized for this route, redirect to their appropriate dashboard
    if (!allowedRoles.includes(user.role)) {
        console.log('User not authorized for this route');
        if (user.role === 'CLIENT') {
            return <Navigate to="/dashboard" replace />;
        } else if (user.role === 'PROVIDER' || user.role === 'ADMIN') {
            return <Navigate to="/provider/dashboard" replace />;
        }
    }

    console.log('Rendering protected content');
    return children;
}; 