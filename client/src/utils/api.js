import axios from 'axios';

// Get API URL from environment variable
// For production: https://electro-bazaar-backend.onrender.com/api
// For development: http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log API URL in development to help debug
if (import.meta.env.DEV) {
  console.log('API URL:', API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type for FormData - let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details in development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    }

    // Handle network errors (backend not reachable)
    if (!error.response) {
      console.error('Network Error: Backend server is not reachable');
      return Promise.reject({
        message: 'Unable to connect to server. Please check your internet connection and ensure the backend is running.',
        isNetworkError: true,
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.put(`/auth/reset-password/${token}`, data),
  addAddress: (data) => api.post('/auth/address', data),
  updateAddress: (id, data) => api.put(`/auth/address/${id}`, data),
  deleteAddress: (id) => api.delete(`/auth/address/${id}`),
};

// Products API
export const productsAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories/all'),
  getBrands: () => api.get('/products/brands/all'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  uploadImages: (id, formData) => {
    // FormData - Content-Type will be set automatically by axios with boundary
    return api.post(`/products/${id}/images`, formData);
  },
  deleteImage: (id, imageId) => api.delete(`/products/${id}/images/${imageId}`),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
  deleteReview: (id, reviewId) => api.delete(`/products/${id}/reviews/${reviewId}`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart', data),
  updateCartItem: (itemId, data) => api.put(`/cart/${itemId}`, data),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  getAllOrders: (params) => api.get('/orders', { params }),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  getOrderStats: () => api.get('/orders/stats/dashboard'),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post(`/wishlist/${productId}`),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
  clearWishlist: () => api.delete('/wishlist'),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
};

export default api;

