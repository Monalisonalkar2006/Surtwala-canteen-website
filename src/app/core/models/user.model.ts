export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'staff' | 'admin';
  avatar?: string;
  address?: string;
  is_active: boolean;
  created_at?: string;
}

export interface AuthResponse {
  token: string;
  refresh_token?: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}
