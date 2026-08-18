// API configuration and helper functions

// Use Vite proxy in development, or direct URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Get auth token from localStorage
export const getToken = () => localStorage.getItem('portfolio_token');

// Set auth token
export const setToken = (token) => localStorage.setItem('portfolio_token', token);

// Remove auth token
export const removeToken = () => localStorage.removeItem('portfolio_token');

// Generic API request helper
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Portfolio API functions
export const portfolioAPI = {
  // Get all portfolio data
  getPortfolio: () => apiRequest('/portfolio'),

  // Update a portfolio section
  updateSection: (section, data) => apiRequest(`/portfolio/${section}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Update entire portfolio
  updatePortfolio: (data) => apiRequest('/portfolio', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Projects API functions
export const projectsAPI = {
  getAll: () => apiRequest('/projects'),
  getById: (id) => apiRequest(`/projects/${id}`),
  create: (data) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Messages API functions
export const messagesAPI = {
  getAll: () => apiRequest('/messages'),
  create: (data) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  markRead: (id) => apiRequest(`/messages/${id}/read`, {
    method: 'PUT',
  }),
  delete: (id) => apiRequest(`/messages/${id}`, {
    method: 'DELETE',
  }),
};

// Visitors API functions
export const visitorsAPI = {
  record: (data) => apiRequest('/visitors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateName: (visitorId, name) => apiRequest('/visitors/name', {
    method: 'PUT',
    body: JSON.stringify({ visitorId, name }),
  }),
  getAll: () => apiRequest('/visitors'),
  getAnalytics: () => apiRequest('/visitors/analytics'),
  getRange: (days = 7) => apiRequest(`/visitors/range?days=${days}`),
};

// Auth API functions
export const authAPI = {
  login: (username, password) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }),
  getMe: () => apiRequest('/auth/me'),
  changePassword: (currentPassword, newPassword) => apiRequest('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  }),
  updateProfile: (data) => apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export default API_BASE_URL;