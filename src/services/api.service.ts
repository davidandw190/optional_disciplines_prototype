import KeycloakService from './keycloak.service';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (KeycloakService.isAuthenticated()) {
      try {
        await KeycloakService.getInstance().updateToken(60);
        const token = KeycloakService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
        KeycloakService.login();
      }
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      console.warn('Session expired or unauthorized. Redirecting to login...');
      KeycloakService.login();
      return Promise.reject(new Error('Authentication required'));
    }

    if (response && response.status === 403) {
      console.warn('Insufficient permissions to access resource');
      return Promise.reject(
        new Error('You do not have permission to access this resource')
      );
    }

    if (response && response.status >= 500) {
      console.error('Server error:', response.data);
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    return Promise.reject(error);
  }
);

const ApiService = {
  get: (endpoint: string, params = {}) => {
    return apiClient.get(endpoint, { params });
  },

  post: (endpoint: string, data = {}) => {
    return apiClient.post(endpoint, data);
  },

  put: (endpoint: string, data = {}) => {
    return apiClient.put(endpoint, data);
  },

  delete: (endpoint: string) => {
    return apiClient.delete(endpoint);
  },

  getStudentProfile: () => {
    return apiClient.get('/student/profile');
  },

  getEnrollmentPeriods: (params: any) => {
    return apiClient.get('/enrollment-periods', { params });
  },
};

export default ApiService;
