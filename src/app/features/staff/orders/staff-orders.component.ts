import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-staff-orders', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Orders</h1>
  <p class="page-subtitle mb-3">Manage incoming orders</p>
  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
    <button *ngFor="let f of filters" class="cat-filter-btn" [class.active]="activeFilter===f" (click)="activeFilter=f"
      style="background:white;border:1.5px solid #e9ecef;border-radius:50px;padding:7px 16px;font-size:13px;font-weight:500;cursor:pointer;transition:.2s"
      [style.background]="activeFilter===f?'var(--primary)':'white'"
      [style.color]="activeFilter===f?'white':'var(--text-secondary)'"
      [style.borderColor]="activeFilter===f?'var(--primary)':'#e9ecef'">
      {{f}}
    </button>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px">
    <div class="card p-3" *ngFor="let o of orders">
      <div class="flex-between mb-2">
        <div class="fw-700" style="color:var(--primary)">{{o.id}}</div>
        <span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fff3cd;color:#e76f51">{{o.status}}</span>
      </div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">{{o.items}}</div>
      <div class="flex-between">
        <span style="font-size:12px;color:var(--text-muted)">{{o.time}}</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary btn-sm">Mark Ready</button>
          <button class="btn btn-outline btn-sm">Details</button>
        </div>
      </div>
    </div>
  </div>
` })
export class StaffOrdersComponent {
  filters = ['All', 'New', 'Preparing', 'Ready'];
  activeFilter = 'All';
  orders = [
    { id: '#ORD1245', items: 'Veg Thali × 1, Tea × 2', status: 'Preparing', time: '10:30 AM' },
    { id: '#ORD1244', items: 'Masala Dosa × 1', status: 'New', time: '10:25 AM' },
    { id: '#ORD1243', items: 'Veg Noodles × 2', status: 'Preparing', time: '10:15 AM' },
  ];
}
