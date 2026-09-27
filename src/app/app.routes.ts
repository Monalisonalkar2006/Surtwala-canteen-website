import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Auth routes (public)
  {
    path: 'auth',
    loadComponent: () => import('./layout/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // Customer routes
  {
    path: 'customer',
    loadComponent: () => import('./layout/customer-layout/customer-layout.component').then(m => m.CustomerLayoutComponent),
    canActivate: [authGuard, roleGuard(['customer'])],
    children: [
      { path: 'home', loadComponent: () => import('./features/customer/home/home.component').then(m => m.CustomerHomeComponent) },
      { path: 'menu', loadComponent: () => import('./features/customer/menu/menu.component').then(m => m.MenuComponent) },
      { path: 'cart', loadComponent: () => import('./features/customer/cart/cart.component').then(m => m.CartComponent) },
      { path: 'checkout', loadComponent: () => import('./features/customer/checkout/checkout.component').then(m => m.CheckoutComponent) },
      { path: 'orders', loadComponent: () => import('./features/customer/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'favorites', loadComponent: () => import('./features/customer/favorites/favorites.component').then(m => m.FavoritesComponent) },
      { path: 'reviews', loadComponent: () => import('./features/customer/reviews/reviews.component').then(m => m.ReviewsComponent) },
      { path: 'profile', loadComponent: () => import('./features/customer/profile/profile.component').then(m => m.ProfileComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  // Admin routes
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard, roleGuard(['admin'])],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'menu', loadComponent: () => import('./features/admin/menu/admin-menu.component').then(m => m.AdminMenuComponent) },
      { path: 'categories', loadComponent: () => import('./features/admin/categories/admin-categories.component').then(m => m.AdminCategoriesComponent) },
      { path: 'orders', loadComponent: () => import('./features/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent) },
      { path: 'users', loadComponent: () => import('./features/admin/users/admin-users.component').then(m => m.AdminUsersComponent) },
      { path: 'staff', loadComponent: () => import('./features/admin/staff/admin-staff.component').then(m => m.AdminStaffComponent) },
      { path: 'offers', loadComponent: () => import('./features/admin/offers/admin-offers.component').then(m => m.AdminOffersComponent) },
      { path: 'inventory', loadComponent: () => import('./features/admin/inventory/admin-inventory.component').then(m => m.AdminInventoryComponent) },
      { path: 'reviews', loadComponent: () => import('./features/admin/reviews/admin-reviews.component').then(m => m.AdminReviewsComponent) },
      { path: 'reports', loadComponent: () => import('./features/admin/reports/admin-reports.component').then(m => m.AdminReportsComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Staff routes
  {
    path: 'staff',
    loadComponent: () => import('./layout/staff-layout/staff-layout.component').then(m => m.StaffLayoutComponent),
    canActivate: [authGuard, roleGuard(['staff'])],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/staff/dashboard/staff-dashboard.component').then(m => m.StaffDashboardComponent) },
      { path: 'orders', loadComponent: () => import('./features/staff/orders/staff-orders.component').then(m => m.StaffOrdersComponent) },
      { path: 'inventory', loadComponent: () => import('./features/staff/inventory/staff-inventory.component').then(m => m.StaffInventoryComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Wildcard
  { path: '**', redirectTo: '/auth/login' },
];
