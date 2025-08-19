import api from './client';

// PUBLIC_INTERFACE
export async function login(payload) {
  /** Authenticate a user and return auth data (JWT token). 
   * Backend expects application/x-www-form-urlencoded with fields:
   * - username
   * - password
   */
  const body = new URLSearchParams({
    username: payload?.email ?? payload?.username ?? '',
    password: payload?.password ?? '',
  }).toString();

  const { data } = await api.post('/auth/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
}

// PUBLIC_INTERFACE
export async function register(payload) {
  /** Register a user and return the created user info (no token from backend). 
   * Backend expects JSON with:
   * - email
   * - password
   */
  const { email, password } = payload || {};
  const { data } = await api.post('/auth/register', { email, password });
  return data;
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Logout the current user (invalidates tokens on server). 
   * If not implemented by backend, this can be a no-op.
   */
  const { data } = await api.post('/auth/logout');
  return data;
}

// PUBLIC_INTERFACE
export async function getMe() {
  /** Get the current authenticated user's info. */
  const { data } = await api.get('/users/me');
  return data;
}

// PUBLIC_INTERFACE
export async function listProfiles() {
  /** List user profiles under current account. */
  const { data } = await api.get('/profiles');
  return data;
}

// PUBLIC_INTERFACE
export async function createProfile(payload) {
  /** Create a new profile for the current account. */
  const { data } = await api.post('/profiles', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteProfile(profileId) {
  /** Delete a profile by ID. */
  const { data } = await api.delete(`/profiles/${profileId}`);
  return data;
}
