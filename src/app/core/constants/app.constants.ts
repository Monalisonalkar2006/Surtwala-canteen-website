export const APP_NAME = 'Surtwala Canteen';
export const APP_TAGLINE = 'Delicious Food, Happiness in every bite!';

export const DELIVERY_CHARGE = 10;
export const FREE_DELIVERY_ABOVE = 200;
export const ITEMS_PER_PAGE = 12;

export const ORDER_STATUSES = [
  { value: 'new', label: 'New', color: '#4361ee', bg: '#dbeafe' },
  { value: 'preparing', label: 'Preparing', color: '#e76f51', bg: '#fff3cd' },
  { value: 'ready', label: 'Ready', color: '#2d6a4f', bg: '#d8f3dc' },
  { value: 'completed', label: 'Completed', color: '#52b788', bg: '#d8f3dc' },
  { value: 'cancelled', label: 'Cancelled', color: '#e63946', bg: '#fde8e8' },
];

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash on Delivery', icon: '💵' },
  { value: 'upi', label: 'UPI', icon: '📱' },
  { value: 'card', label: 'Card', icon: '💳' },
];

export const STORAGE_KEYS = {
  TOKEN: 'sc_token',
  REFRESH_TOKEN: 'sc_refresh',
  USER: 'sc_user',
  CART: 'sc_cart',
};
