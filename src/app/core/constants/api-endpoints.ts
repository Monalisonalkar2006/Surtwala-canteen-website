export const API_BASE = 'http://localhost:8000/api';

export const API = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login/`,
    REGISTER: `${API_BASE}/auth/register/`,
    LOGOUT: `${API_BASE}/auth/logout/`,
    REFRESH: `${API_BASE}/auth/token/refresh/`,
    PROFILE: `${API_BASE}/auth/profile/`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password/`,
  },
  MENU: {
    LIST: `${API_BASE}/menu/`,
    DETAIL: (id: number) => `${API_BASE}/menu/${id}/`,
    FEATURED: `${API_BASE}/menu/featured/`,
    SEARCH: `${API_BASE}/menu/search/`,
  },
  CATEGORIES: {
    LIST: `${API_BASE}/categories/`,
    DETAIL: (id: number) => `${API_BASE}/categories/${id}/`,
  },
  CART: {
    GET: `${API_BASE}/cart/`,
    ADD: `${API_BASE}/cart/add/`,
    UPDATE: (id: number) => `${API_BASE}/cart/item/${id}/`,
    REMOVE: (id: number) => `${API_BASE}/cart/item/${id}/`,
    CLEAR: `${API_BASE}/cart/clear/`,
    APPLY_COUPON: `${API_BASE}/cart/coupon/`,
  },
  ORDERS: {
    LIST: `${API_BASE}/orders/`,
    CREATE: `${API_BASE}/orders/`,
    DETAIL: (id: number) => `${API_BASE}/orders/${id}/`,
    UPDATE_STATUS: (id: number) => `${API_BASE}/orders/${id}/status/`,
    CANCEL: (id: number) => `${API_BASE}/orders/${id}/cancel/`,
  },
  REVIEWS: {
    LIST: `${API_BASE}/reviews/`,
    CREATE: `${API_BASE}/reviews/`,
    DETAIL: (id: number) => `${API_BASE}/reviews/${id}/`,
    FOOD_REVIEWS: (foodId: number) => `${API_BASE}/menu/${foodId}/reviews/`,
  },
  ADMIN: {
    DASHBOARD: `${API_BASE}/admin/dashboard/`,
    USERS: `${API_BASE}/admin/users/`,
    STAFF: `${API_BASE}/admin/staff/`,
    REPORTS: `${API_BASE}/admin/reports/`,
    INVENTORY: `${API_BASE}/admin/inventory/`,
    OFFERS: `${API_BASE}/admin/offers/`,
  },
  STAFF: {
    DASHBOARD: `${API_BASE}/staff/dashboard/`,
    ORDERS: `${API_BASE}/staff/orders/`,
    INVENTORY: `${API_BASE}/staff/inventory/`,
  },
  PAYMENT: {
    INITIATE: `${API_BASE}/payment/initiate/`,
    VERIFY: `${API_BASE}/payment/verify/`,
  },
};
