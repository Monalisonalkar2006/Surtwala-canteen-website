export type UserRole = 'customer' | 'staff' | 'admin';

export const ROLES = {
  CUSTOMER: 'customer' as UserRole,
  STAFF: 'staff' as UserRole,
  ADMIN: 'admin' as UserRole,
};

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  customer: '/customer/home',
  staff: '/staff/dashboard',
  admin: '/admin/dashboard',
};
