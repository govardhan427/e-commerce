import axios from 'axios';

// Create a new Axios instance with a custom configuration
const apiClient = axios.create({
  // The base URL of your Django Rest Framework backend
  baseURL: 'http://127.0.0.1:8000/api', 
  
  // Set default headers for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR
 * This will run before every request is sent.
 * It checks if we have auth tokens in localStorage and, if so,
 * adds the Authorization header to the request.
 */
apiClient.interceptors.request.use(config => {
  const authTokens = localStorage.getItem('authTokens') 
    ? JSON.parse(localStorage.getItem('authTokens')) 
    : null;

  if (authTokens) {
    config.headers.Authorization = `Bearer ${authTokens.access}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;