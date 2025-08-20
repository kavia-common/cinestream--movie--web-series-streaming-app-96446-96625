import axios from 'axios';
import { getToken } from '../utils/storage';

// Resolve API base URL from multiple env var options to be resilient to different setups.
// Priority order:
// 1. REACT_APP_API_BASE_URL (preferred for CRA)
// 2. REACT_APP_BACKEND_URL (common alternative)
// 3. BACKEND_URL / PUBLIC_BACKEND_URL (some environments inject these at build time)
// 4. Smart local fallback to same host on :3001 (typical backend port in this project)
// 5. Finally, '/api' for proxy-based setups
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

  if (!url && typeof window !== 'undefined') {
    // Guess backend at same host but port 3001 (our FastAPI default in this workspace)
    try {
      const { protocol, hostname, port } = window.location;
      // Only guess if we're not already on 3001
      if (hostname) {
        const guessed = `${protocol}//${hostname}:3001`;
        // eslint-disable-next-line no-console
        if (!window.__API_BASE_URL_WARNED__) {
          console.warn(
            `[CineStream] No API base URL configured. Guessing backend at ${guessed}. ` +
            'Set REACT_APP_API_BASE_URL to silence this message.'
          );
          window.__API_BASE_URL_WARNED__ = true;
        }
        return guessed;
      }
    } catch {
      // ignore and fall through to '/api'
    }
  }

  // Fall back to '/api' for local proxy setups if nothing is configured
  if (!url) {
    if (typeof window !== 'undefined' && !window.__API_BASE_URL_WARNED__) {
      // eslint-disable-next-line no-console
      console.warn(
        '[CineStream] No API base URL configured. Falling back to "/api". ' +
        'Set REACT_APP_API_BASE_URL (preferred) or REACT_APP_BACKEND_URL in .env.'
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
