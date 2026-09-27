import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-staff-dashboard', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Staff Dashboard</h1>
  <p class="page-subtitle mb-3">Today's overview</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-bottom:20px">
    <div class="card p-3" *ngFor="let s of stats" style="text-align:center">
      <div style="font-size:28px;margin-bottom:8px">{{s.icon}}</div>
      <div style="font-size:22px;font-weight:800">{{s.value}}</div>
      <div style="font-size:12px;color:var(--text-muted)">{{s.label}}</div>
    </div>
  </div>
  <div class="card p-3">
    <h3 class="fw-700 mb-3">Active Orders</h3>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div class="card p-2" *ngFor="let o of orders" style="display:flex;align-items:center;gap:12px;box-shadow:none;border:1.5px solid var(--border-color)">
        <div style="font-weight:700;color:var(--primary);font-size:14px;min-width:80px">{{o.id}}</div>
        <div style="flex:1;font-size:13px">{{o.items}}</div>
        <div>
          <span style="padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700"
            [style.background]="o.status==='preparing'?'#fff3cd':'#d8f3dc'"
            [style.color]="o.status==='preparing'?'#e76f51':'#2d6a4f'">
            {{o.status|titlecase}}
          </span>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-primary btn-sm">Ready</button>
        </div>
      </div>
    </div>
  </div>
` })
export class StaffDashboardComponent {
  stats = [
    { label: 'New Orders', value: 12, icon: '🆕' },
    { label: 'Preparing', value: 8, icon: '👨‍🍳' },
    { label: 'Ready', value: 3, icon: '✅' },
    { label: 'Completed Today', value: 42, icon: '📦' },
  ];
  orders = [
    { id: '#ORD1245', items: 'Veg Thali, Tea', status: 'new' },
    { id: '#ORD1244', items: 'Masala Dosa', status: 'preparing' },
    { id: '#ORD1243', items: 'Veg Noodles, Coffee', status: 'preparing' },
  ];
}
