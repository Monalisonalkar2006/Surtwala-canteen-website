import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 class="page-title">My Orders</h1>
      <p class="page-subtitle">Track and manage your orders</p>
      <div class="orders-list mt-3">
        <div class="card p-3 mb-2" *ngFor="let order of orders">
          <div class="flex-between">
            <div>
              <div class="fw-700">{{ order.id }}</div>
              <div style="font-size:12px;color:var(--text-muted)">{{ order.date }} · {{ order.items }}</div>
            </div>
            <div style="text-align:right">
              <div class="fw-700">{{ order.amount }}</div>
              <span class="badge" [class]="'badge-'+order.statusClass">{{ order.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrdersComponent {
  orders = [
    { id: '#ORD1245', date: '22 May 2024', items: 'Veg Thali, Tea', amount: '₹135', status: 'Completed', statusClass: 'success' },
    { id: '#ORD1240', date: '20 May 2024', items: 'Masala Dosa', amount: '₹70', status: 'Completed', statusClass: 'success' },
    { id: '#ORD1235', date: '18 May 2024', items: 'Veg Noodles, Coffee', amount: '₹100', status: 'Cancelled', statusClass: 'danger' },
  ];
}
