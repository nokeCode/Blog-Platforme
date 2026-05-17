import axios from 'axios';
import {
  MOCK_FEATURED_POST,
  MOCK_OTHER_FEATURED,
  MOCK_RECENT_POSTS,
  MOCK_ALL_POSTS,
} from './mockData';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Helper: try real API, optionally fall back to mock
async function safeFetch(apiFn, { mockData, fallback }) {
  try {
    const res = await apiFn();

    // Backend renvoie souvent: { success: true, data: ... }
    if (res?.data?.data !== undefined) return res.data.data;

    // Compat: si l'API renvoie directement la valeur
    return res.data;
  } catch (err) {
    if (USE_MOCK) {
      console.log('Using mock data for:', apiFn.name || 'unknown');
      return mockData;
    }
    console.warn('API error (mock disabled):', apiFn.name || 'unknown', err?.message || err);
    return fallback;
  }
}

export const getPosts = () =>
  safeFetch(() => api.get('/posts'), { mockData: MOCK_ALL_POSTS, fallback: [] });

export const getFeaturedPost = () =>
  safeFetch(() => api.get('/posts/featured'), { mockData: MOCK_FEATURED_POST, fallback: null });

export const getOtherFeatured = () =>
  safeFetch(() => api.get('/posts/featured/others'), { mockData: MOCK_OTHER_FEATURED, fallback: [] });

export const getRecentPosts = () =>
  safeFetch(() => api.get('/posts/recent'), { mockData: MOCK_RECENT_POSTS, fallback: [] });

export const getPostById = (id) =>
  safeFetch(() => api.get(`/posts/${id}`), {
    mockData: MOCK_ALL_POSTS.find((p) => p._id === id) || null,
    fallback: null,
  });

export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);

export default api;
