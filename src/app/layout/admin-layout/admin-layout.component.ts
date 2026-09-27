import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  sidebarOpen = false;

  navItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/menu', icon: '🍴', label: 'Menu Management' },
    { path: '/admin/categories', icon: '🗂️', label: 'Categories' },
    { path: '/admin/orders', icon: '📋', label: 'Order Management' },
    { path: '/admin/users', icon: '👥', label: 'Customers' },
    { path: '/admin/staff', icon: '👨‍💼', label: 'Staff Management' },
    { path: '/admin/offers', icon: '🏷️', label: 'Offers & Coupons' },
    { path: '/admin/inventory', icon: '📦', label: 'Inventory' },
    { path: '/admin/reviews', icon: '⭐', label: 'Feedback & Reviews' },
    { path: '/admin/reports', icon: '📈', label: 'Reports & Analytics' },
  ];

  todayDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  constructor(
    public authService: AuthService,
    public notifService: NotificationService
  ) {}

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar() { this.sidebarOpen = false; }
  logout() { this.authService.logout(); }
}
