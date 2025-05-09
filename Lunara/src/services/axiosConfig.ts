import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL with context path
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Enable sending cookies and auth headers
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('token');
                    break;
                case 403:
                    // Handle forbidden
                    break;
                default:
                    // Handle other errors
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 