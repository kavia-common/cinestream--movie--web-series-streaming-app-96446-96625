import axios from 'axios';
import { getToken } from '../utils/storage';

// Resolve API base URL from multiple env var options to be resilient to different setups.
// Priority order:
// 1. REACT_APP_API_BASE_URL (preferred for CRA)
// 2. REACT_APP_BACKEND_URL (common alternative)
// 3. BACKEND_URL / PUBLIC_BACKEND_URL (some environments inject these at build time)
function resolveBaseURL() {
  const raw =
    process.env.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    process.env.BACKEND_URL ||
    process.env.PUBLIC_BACKEND_URL ||
    '';

  // Normalize and strip common docs endpoints if someone pasted /docs or /openapi.json
  let url = (raw || '').trim();
  if (url) {
    url = url.replace(/\s+/g, '');
    // remove trailing slashes
    url = url.replace(/\/*$/, '');
    // strip accidental docs/openapi suffixes
    url = url.replace(/\/(docs|redoc|openapi\.json)$/i, '');
  }

  // Fall back to '/api' for local proxy setups if nothing is configured
  if (!url) {
    // Helpful message for local dev if registration/login fail due to missing config
    // This will only warn once per load.
    if (typeof window !== 'undefined' && !window.__API_BASE_URL_WARNED__) {
      // eslint-disable-next-line no-console
      console.warn(
        '[CineStream] No API base URL configured. Set REACT_APP_API_BASE_URL (preferred) or REACT_APP_BACKEND_URL in .env. Falling back to "/api".'
      );
      window.__API_BASE_URL_WARNED__ = true;
    }
    return '/api';
  }
  return url;
}

const baseURL = resolveBaseURL();

/**
 * Axios API client with interceptors for auth and error handling.
 */
const api = axios.create({
  // If baseURL is absolute (http/https), axios will use it directly; otherwise treat as relative path.
  baseURL,
  // Avoid sending cookies by default to prevent CORS issues with wildcard origins on the backend.
  // Our auth is token-based via Authorization header.
  withCredentials: false,
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
