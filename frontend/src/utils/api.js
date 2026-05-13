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

// Helper: try real API, fall back to mock
async function safeFetch(apiFn, mockData) {
  try {
    const res = await apiFn();
    return res.data;
  } catch {
    return mockData;
  }
}

export const getPosts = () =>
  safeFetch(() => api.get('/posts'), MOCK_ALL_POSTS);

export const getFeaturedPost = () =>
  safeFetch(() => api.get('/posts/featured'), MOCK_FEATURED_POST);

export const getOtherFeatured = () =>
  safeFetch(() => api.get('/posts/featured/others'), MOCK_OTHER_FEATURED);

export const getRecentPosts = () =>
  safeFetch(() => api.get('/posts/recent'), MOCK_RECENT_POSTS);

export const getPostById = (id) =>
  safeFetch(() => api.get(`/posts/${id}`), MOCK_ALL_POSTS.find((p) => p._id === id));

export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);

export default api;
