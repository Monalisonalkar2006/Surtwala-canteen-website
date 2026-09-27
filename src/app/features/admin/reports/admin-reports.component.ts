import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-admin-reports', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Reports & Analytics</h1>
  <p class="page-subtitle mb-3">Business insights and performance</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:24px">
    <div class="card p-3" *ngFor="let s of stats">
      <div style="font-size:28px;margin-bottom:8px">{{s.icon}}</div>
      <div style="font-size:22px;font-weight:800;color:var(--text-primary)">{{s.value}}</div>
      <div style="font-size:13px;color:var(--text-muted)">{{s.label}}</div>
    </div>
  </div>
  <div class="card p-3">
    <h3 class="fw-700 mb-3">Monthly Revenue</h3>
    <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding-bottom:8px">
      <div *ngFor="let m of monthly" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div [style.height]="m.h+'px'" [style.background]="'var(--primary)'" style="width:100%;border-radius:6px 6px 0 0;transition:.3s"></div>
        <div style="font-size:10px;color:var(--text-muted)">{{m.month}}</div>
      </div>
    </div>
  </div>
` })
export class AdminReportsComponent {
  stats = [
    { label: 'Total Revenue', value: '₹1,84,500', icon: '💰' },
    { label: 'Total Orders', value: '1,284', icon: '📋' },
    { label: 'Avg Order Value', value: '₹143', icon: '📊' },
    { label: 'Active Customers', value: '256', icon: '👥' },
  ];
  monthly = [
    { month: 'Jan', h: 60 }, { month: 'Feb', h: 75 }, { month: 'Mar', h: 55 },
    { month: 'Apr', h: 85 }, { month: 'May', h: 100 }, { month: 'Jun', h: 90 },
  ];
}
