import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Updated to match your Spring Boot configuration
    headers: {
        'Content-Type': 'application/json',
    },
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
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 