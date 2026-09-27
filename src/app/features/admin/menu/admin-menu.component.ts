import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-between mb-3">
      <div><h1 class="page-title">Menu Management</h1><p class="page-subtitle">Manage all food items</p></div>
      <button class="btn btn-primary">+ Add New Item</button>
    </div>
    <div class="card">
      <table class="data-table" style="width:100%;border-collapse:collapse">
        <thead><tr style="background:#f8f9fa">
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Item</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Category</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Price</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Status</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Action</th>
        </tr></thead>
        <tbody>
          <tr *ngFor="let item of items" style="border-bottom:1px solid #f1f5f9">
            <td style="padding:14px 16px;display:flex;align-items:center;gap:10px"><span style="font-size:24px">{{item.emoji}}</span>{{item.name}}</td>
            <td style="padding:14px 16px;color:var(--text-secondary)">{{item.cat}}</td>
            <td style="padding:14px 16px;font-weight:700">₹{{item.price}}</td>
            <td style="padding:14px 16px"><span class="badge" [class.badge-success]="item.available" [class.badge-danger]="!item.available">{{item.available?'Available':'Unavailable'}}</span></td>
            <td style="padding:14px 16px;display:flex;gap:8px">
              <button class="btn btn-outline btn-sm">✏️ Edit</button>
              <button class="btn btn-danger btn-sm">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class AdminMenuComponent {
  items = [
    { name: 'Veg Thali', cat: 'Thali', price: 120, available: true, emoji: '🍛' },
    { name: 'Paneer Butter Masala', cat: 'Thali', price: 130, available: true, emoji: '🧆' },
    { name: 'Veg Biryani', cat: 'Rice', price: 110, available: true, emoji: '🍚' },
    { name: 'Masala Dosa', cat: 'Breakfast', price: 70, available: true, emoji: '🫔' },
    { name: 'Veg Sandwich', cat: 'Snacks', price: 60, available: true, emoji: '🥪' },
    { name: 'Tea', cat: 'Beverages', price: 15, available: true, emoji: '☕' },
  ];
}
