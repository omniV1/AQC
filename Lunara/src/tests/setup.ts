import '@testing-library/jest-dom';

// Mock the Vite environment
process.env.VITE_API_BASE_URL = 'http://localhost:8080';

// Add Jest types
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
        }
    }
} 