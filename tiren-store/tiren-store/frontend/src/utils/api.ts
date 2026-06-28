import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('tiren_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('tiren_token');
      localStorage.removeItem('tiren_user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const productsAPI = {
  getAll: (params?: object) => api.get('/products', { params }),
  getOne: (slug: string) => api.get(`/products/${slug}`),
  create: (data: object) => api.post('/products', data),
  update: (id: string, data: object) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data: object) => api.post('/categories', data),
};

export const ordersAPI = {
  place: (data: object) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my'),
  getOne: (id: string) => api.get(`/orders/${id}`),
  cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data: object) => api.post('/cart', data),
  update: (id: string, data: object) => api.put(`/cart/${id}`, data),
  remove: (id: string) => api.delete(`/cart/${id}`),
  clear: () => api.delete('/cart'),
};

export const authAPI = {
  login: (data: object) => api.post('/auth/login', data),
  register: (data: object) => api.post('/auth/register', data),
  sendOTP: (phone: string) => api.post('/auth/send-otp', { phone }),
  verifyOTP: (data: object) => api.post('/auth/verify-otp', data),
  me: () => api.get('/auth/me'),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: object) => api.put('/users/profile', data),
  getAddresses: () => api.get('/users/addresses'),
  addAddress: (data: object) => api.post('/users/addresses', data),
  deleteAddress: (id: string) => api.delete(`/users/addresses/${id}`),
  getWishlist: () => api.get('/users/wishlist'),
  toggleWishlist: (productId: string) => api.post(`/users/wishlist/${productId}`),
  getNotifications: () => api.get('/users/notifications'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getOrders: (params?: object) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, status: string) => api.patch(`/admin/orders/${id}/status`, { status }),
  getCustomers: () => api.get('/admin/customers'),
};

export const couponsAPI = {
  validate: (data: object) => api.post('/coupons/validate', data),
  getAll: () => api.get('/coupons'),
  create: (data: object) => api.post('/coupons', data),
};

export const reviewsAPI = {
  create: (productId: string, data: object) => api.post(`/reviews/${productId}`, data),
};

export default api;
