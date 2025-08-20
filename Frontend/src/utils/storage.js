const TOKEN_KEY = 'cs_token';
const USER_KEY = 'cs_user';
const PROFILE_KEY = 'cs_profile';

// PUBLIC_INTERFACE
export function saveToken(token) {
  /** Persist JWT token to localStorage. */
  localStorage.setItem(TOKEN_KEY, token || '');
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Retrieve JWT token from localStorage. */
  return localStorage.getItem(TOKEN_KEY) || '';
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Remove JWT token from localStorage. */
  localStorage.removeItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function saveUser(user) {
  /** Persist user object to localStorage. */
  localStorage.setItem(USER_KEY, JSON.stringify(user || null));
}

// PUBLIC_INTERFACE
export function getUser() {
  /** Retrieve user object from localStorage. */
  const raw = localStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveActiveProfile(profile) {
  /** Persist the active profile for the account. */
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile || null));
}

// PUBLIC_INTERFACE
export function getActiveProfile() {
  /** Retrieve the active profile for the account. */
  const raw = localStorage.getItem(PROFILE_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function clearAllAuth() {
  /** Clear all persisted auth-related data. */
  clearToken();
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PROFILE_KEY);
}
