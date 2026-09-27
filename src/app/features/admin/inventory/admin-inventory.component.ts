import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-admin-inventory', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Inventory</h1>
  <p class="page-subtitle mb-3">Track stock levels</p>
  <div class="card">
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="background:#f8f9fa"><th class="th">Item</th><th class="th">Qty</th><th class="th">Unit</th><th class="th">Status</th><th class="th">Action</th></tr></thead>
        <tbody>
          <tr *ngFor="let i of items" style="border-bottom:1px solid #f1f5f9">
            <td class="td">{{i.name}}</td>
            <td class="td fw-700">{{i.qty}}</td>
            <td class="td text-muted">{{i.unit}}</td>
            <td class="td"><span class="badge" [class.badge-success]="i.status==='in_stock'" [class.badge-warning]="i.status==='low_stock'" [class.badge-danger]="i.status==='out'">{{i.status==='in_stock'?'In Stock':i.status==='low_stock'?'Low Stock':'Out of Stock'}}</span></td>
            <td class="td"><button class="btn btn-outline btn-sm">Update</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`, styles:[`.th{padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase}.td{padding:14px 16px;font-size:13px}`] })
export class AdminInventoryComponent {
  items = [
    { name: 'Rice', qty: 50, unit: 'kg', status: 'in_stock' },
    { name: 'Wheat Flour', qty: 8, unit: 'kg', status: 'low_stock' },
    { name: 'Paneer', qty: 0, unit: 'kg', status: 'out' },
    { name: 'Cooking Oil', qty: 20, unit: 'ltr', status: 'in_stock' },
    { name: 'Tomatoes', qty: 5, unit: 'kg', status: 'low_stock' },
  ];
}
