import api from './client';

// PUBLIC_INTERFACE
export async function login(payload) {
  /** Authenticate a user and return auth data (tokens, user info). */
  const { data } = await api.post('/auth/login', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function register(payload) {
  /** Register a user and return auth data (tokens, user info). */
  const { data } = await api.post('/auth/register', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function logout() {
  /** Logout the current user (invalidates tokens on server). */
  const { data } = await api.post('/auth/logout');
  return data;
}

// PUBLIC_INTERFACE
export async function getMe() {
  /** Get the current authenticated user's info. */
  const { data } = await api.get('/auth/me');
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
