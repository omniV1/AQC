import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

/**
 * Custom error types for different scenarios
 */
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class ValidationError extends Error {
    constructor(message: string, public errors: Record<string, string[]>) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class ApiError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Centralized error handling
 * Converts different error types into consistent format
 * Provides proper error messages for different scenarios
 */
export class ErrorHandler {
    /**
     * Handle different types of errors
     * @param error - The error to handle
     * @returns Standardized error object
     */
    static handle(error: unknown): Error {
        if (error instanceof AxiosError) {
            return this.handleAxiosError(error);
        }
        
        if (error instanceof Error) {
            return error;
        }
        
        return new Error('An unexpected error occurred');
    }

    /**
     * Handle Axios specific errors
     * @param error - Axios error object
     * @returns Appropriate error type
     */
    private static handleAxiosError(error: AxiosError<ErrorResponse>): Error {
        // Network errors (no response)
        if (!error.response) {
            return new NetworkError('Unable to connect to the server');
        }

        const { status, data, config } = error.response;
        const url = config.url || '';

        // Authentication errors
        if (status === 401) {
            return new AuthenticationError('Authentication required');
        }

        if (status === 403) {
            return new AuthenticationError('Access denied');
        }

        // Validation errors
        if (status === 422 && data && typeof data === 'object') {
            return new ValidationError(
                'Validation failed',
                data as Record<string, string[]>
            );
        }

        // Server errors
        if (status >= 500) {
            if (url.includes('/appointments')) {
                return new ApiError('Failed to fetch appointments', status);
            }
            if (url.includes('/providers') && !url.includes('/availability')) {
                return new ApiError('Failed to fetch providers', status);
            }
            if (url.includes('/availability')) {
                return new ApiError('Failed to fetch provider availability', status);
            }
            if (url.includes('/sessions')) {
                return new ApiError('Failed to fetch sessions', status);
            }
            return new ApiError('Server error occurred', status);
        }

        // Client errors
        if (status === 400) {
            return new ApiError(data?.message || 'Invalid request', status);
        }

        if (status === 404) {
            return new ApiError('Resource not found', status);
        }

        if (status === 409) {
            return new ApiError(data?.message || 'Conflict occurred', status);
        }

        // Default error
        return new ApiError(
            data?.message || 'An error occurred',
            status
        );
    }

    /**
     * Get user-friendly message for different error types
     * @param error - The error object
     * @returns User-friendly error message
     */
    static getUserMessage(error: Error): string {
        if (error instanceof NetworkError) {
            return 'Unable to connect to the server. Please check your internet connection.';
        }

        if (error instanceof AuthenticationError) {
            return 'Please log in to continue.';
        }

        if (error instanceof ValidationError) {
            return 'Please check your input and try again.';
        }

        if (error instanceof ApiError) {
            return error.message;
        }

        return 'An unexpected error occurred. Please try again.';
    }
} 