import api from './client';

// PUBLIC_INTERFACE
export async function adminListContent(params = {}) {
  /** List content items for admin panel with filters/pagination. */
  const { data } = await api.get('/admin/content', { params });
  return data;
}

// PUBLIC_INTERFACE
export async function adminCreateContent(formData) {
  /** Create a new content item; expects multipart/form-data (assets, metadata). */
  const { data } = await api.post('/admin/content', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// PUBLIC_INTERFACE
export async function adminUpdateContent(id, payload) {
  /** Update an existing content item by ID. */
  const { data } = await api.put(`/admin/content/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function adminDeleteContent(id) {
  /** Delete content item by ID. */
  const { data } = await api.delete(`/admin/content/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function adminUsers(params = {}) {
  /** List users for admin management. */
  const { data } = await api.get('/admin/users', { params });
  return data;
}

// PUBLIC_INTERFACE
export async function adminAnalytics(params = {}) {
  /** Retrieve analytics data for charts and dashboards. */
  const { data } = await api.get('/admin/analytics', { params });
  return data;
}
