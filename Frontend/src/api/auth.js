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
   *
   * Extended payload support:
   * - email (required)
   * - password (required)
   * - phone (optional)
   * - name (optional - for profile/display)
   * - age (optional - number)
   * - plan_id / plan_name / plan_key (optional - selected plan)
   * - payment_confirmation (optional - object with gateway confirmation/session details)
   *
   * Only provided fields are sent to the backend. Backends that ignore unknown
   * fields will continue to work without changes.
   */
  const allowList = [
    'email',
    'password',
    'phone',
    'name',
    'age',
    'plan_id',
    'plan_name',
    'plan_key',
    'payment_confirmation',
  ];
  const body = {};
  (allowList).forEach((k) => {
    if (payload?.[k] !== undefined) body[k] = payload[k];
  });

  const { data } = await api.post('/auth/register', body);
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
