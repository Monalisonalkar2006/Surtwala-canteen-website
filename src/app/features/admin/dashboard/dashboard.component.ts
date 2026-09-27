import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class AdminDashboardComponent {
  stats = [
    { label: 'Total Orders', value: '184', change: '+12%', up: true, icon: '📋', color: '#4361ee' },
    { label: 'Total Sales', value: '₹18,450', change: '+15%', up: true, icon: '💰', color: '#52b788' },
    { label: 'Pending Orders', value: '12', change: '-8%', up: false, icon: '⏳', color: '#f4a261' },
    { label: 'Total Customers', value: '256', change: '+10%', up: true, icon: '👥', color: '#7c3aed' },
  ];

  orderOverview = [
    { label: 'New', count: 12, percent: 10, color: '#4361ee' },
    { label: 'Preparing', count: 28, percent: 23, color: '#f4a261' },
    { label: 'Ready', count: 6, percent: 7, color: '#52b788' },
    { label: 'Completed', count: 42, percent: 52, color: '#2d6a4f' },
    { label: 'Cancelled', count: 3, percent: 8, color: '#e63946' },
  ];

  popularItems = [
    { rank: 1, name: 'Veg Thali', orders: 120, emoji: '🍛' },
    { rank: 2, name: 'Masala Dosa', orders: 95, emoji: '🫔' },
    { rank: 3, name: 'Tea', orders: 80, emoji: '☕' },
    { rank: 4, name: 'Paneer Butter Masala', orders: 70, emoji: '🧆' },
    { rank: 5, name: 'Veg Noodles', orders: 60, emoji: '🍜' },
  ];

  recentOrders = [
    { id: '#ORD1245', customer: 'Monali Pawar', amount: '₹225', status: 'new', time: '10:30 AM' },
    { id: '#ORD1244', customer: 'Rahul Patil', amount: '₹120', status: 'preparing', time: '10:20 AM' },
    { id: '#ORD1243', customer: 'Smita Joshi', amount: '₹60', status: 'ready', time: '10:05 AM' },
    { id: '#ORD1242', customer: 'Vedant Shinde', amount: '₹140', status: 'completed', time: '09:55 AM' },
    { id: '#ORD1241', customer: 'Pooja More', amount: '₹60', status: 'cancelled', time: '09:40 AM' },
  ];

  statusColor(status: string): { bg: string; color: string } {
    const map: Record<string, { bg: string; color: string }> = {
      new: { bg: '#dbeafe', color: '#4361ee' },
      preparing: { bg: '#fff3cd', color: '#e76f51' },
      ready: { bg: '#d8f3dc', color: '#2d6a4f' },
      completed: { bg: '#d8f3dc', color: '#52b788' },
      cancelled: { bg: '#fde8e8', color: '#e63946' },
    };
    return map[status] || { bg: '#f1f5f9', color: '#64748b' };
  }
}
