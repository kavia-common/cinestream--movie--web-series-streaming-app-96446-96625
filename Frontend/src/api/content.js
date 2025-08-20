import api from './client';

// PUBLIC_INTERFACE
export async function getHomeSections() {
  /** Fetch categorized sections like Trending, Latest, Originals, Recommended. */
  const { data } = await api.get('/content/home');
  return data;
}

// PUBLIC_INTERFACE
export async function searchContent(query) {
  /** Search content by query, genre, language, year, etc. */
  const { data } = await api.get('/content/search', { params: query });
  return data;
}

// PUBLIC_INTERFACE
export async function getContentDetails(id) {
  /** Get detailed info for a title including streaming sources. */
  const { data } = await api.get(`/content/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function addToWatchlist(id) {
  /** Add a title to the current user's watchlist. */
  const { data } = await api.post(`/watchlist`, { id });
  return data;
}

// PUBLIC_INTERFACE
export async function removeFromWatchlist(id) {
  /** Remove a title from the current user's watchlist. */
  const { data } = await api.delete(`/watchlist/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function getWatchlist() {
  /** Get the current user's watchlist. */
  const { data } = await api.get(`/watchlist`);
  return data;
}

// PUBLIC_INTERFACE
export async function submitRatingReview(id, payload) {
  /** Submit rating/review for a title. */
  const { data } = await api.post(`/content/${id}/reviews`, payload);
  return data;
}
