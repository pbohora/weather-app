import axios from 'axios';

/**
 * Centralizing for global configuration like timeouts,
 * interceptors, and error handling.
 */
export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('Global API Error:', message);
    return Promise.reject(error);
  },
);
