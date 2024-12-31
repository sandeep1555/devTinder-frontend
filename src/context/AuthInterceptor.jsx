import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,// Replace with your API base URL
  withCredentials: true, // Ensures cookies are sent with requests if needed
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response directly if successful
    return response;
  },
  (error) => {
    // Handle errors, e.g., token expiration
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      console.error('Unauthorized access. Please log in again.');
      localStorage.removeItem('authToken'); // Remove token from storage
      window.location.href = '/'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
