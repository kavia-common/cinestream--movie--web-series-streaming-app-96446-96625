import axios from 'axios';
import { getToken } from '../utils/storage';

/**
 * Resolve API base URL from environment variables with sensible fallbacks.
 *
 * Priority:
 * 1) REACT_APP_BACKEND_API_URL (requested)
 * 2) REACT_APP_API_BASE_URL (legacy/preferred CRA name)
 * 3) REACT_APP_BACKEND_URL (common alternative)
 * 4) BACKEND_URL / PUBLIC_BACKEND_URL (injected by some platforms)
 * 5) Guess http(s)://<host>:3001 for local FastAPI dev
 * 6) '/api' for proxy-based setups
 */
function resolveBaseURL() {
  const raw =
    process.env.REACT_APP_BACKEND_API_URL ||
    process.env.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    process.env.BACKEND_URL ||
    process.env.PUBLIC_BACKEND_URL ||
    '';

  // Normalize value, strip trailing slashes and accidental docs endpoints.
  let url = (raw || '').trim();
  if (url) {
    url = url.replace(/\s+/g, '');
    url = url.replace(/\/*$/, '');
    url = url.replace(/\/(docs|redoc|openapi\.json)$/i, '');
  }

  if (!url && typeof window !== 'undefined') {
    // Guess backend at same host but FastAPI default port 3001
    try {
      const { protocol, hostname } = window.location;
      if (hostname) {
        const guessed = `${protocol}//${hostname}:3001`;
        if (!window.__API_BASE_URL_WARNED__) {
          // eslint-disable-next-line no-console
          console.warn(
            `[CineStream] No API base URL configured. Guessing backend at ${guessed}. ` +
              'Set REACT_APP_BACKEND_API_URL to silence this message.'
          );
          window.__API_BASE_URL_WARNED__ = true;
        }
        return guessed;
      }
    } catch {
      // ignore and fall through to '/api'
    }
  }

  if (!url) {
    if (typeof window !== 'undefined' && !window.__API_BASE_URL_WARNED__) {
      // eslint-disable-next-line no-console
      console.warn(
        '[CineStream] No API base URL configured. Falling back to "/api". ' +
          'Set REACT_APP_BACKEND_API_URL (preferred) or REACT_APP_API_BASE_URL in .env.'
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
  baseURL,
  // Token-based auth via Authorization header (avoid cookies to reduce CORS complexity).
  withCredentials: false,
});

// Attach Authorization header if token is present
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
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
