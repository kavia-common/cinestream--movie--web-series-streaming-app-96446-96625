import axios from 'axios';
import { getToken } from '../utils/storage';

const baseURL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

/**
 * Axios API client with interceptors for auth and error handling.
 */
const api = axios.create({
  // If REACT_APP_API_BASE_URL is set, use it as-is (no automatic '/api' suffix).
  // Otherwise, default to '/api' to support local proxy setups.
  baseURL: baseURL || '/api',
  withCredentials: true,
});

// Attach Authorization header if token is present
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // Bearer token for secure endpoints
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
export function getApiClient() {
  /** Returns the configured Axios client instance for API calls. */
  return api;
}

export default api;
