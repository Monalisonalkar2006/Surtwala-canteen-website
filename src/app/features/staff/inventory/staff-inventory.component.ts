import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-staff-inventory', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Inventory Check</h1>
  <p class="page-subtitle mb-3">Current stock levels</p>
  <div class="card">
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="background:#f8f9fa">
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Item</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Quantity</th>
          <th style="padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Status</th>
        </tr></thead>
        <tbody>
          <tr *ngFor="let i of items" style="border-bottom:1px solid #f1f5f9">
            <td style="padding:14px 16px;font-size:13px">{{i.name}}</td>
            <td style="padding:14px 16px;font-size:13px;font-weight:700">{{i.qty}} {{i.unit}}</td>
            <td style="padding:14px 16px">
              <span class="badge" [class.badge-success]="i.ok" [class.badge-warning]="!i.ok && i.qty>0" [class.badge-danger]="i.qty===0">
                {{i.qty===0?'Out of Stock':i.ok?'OK':'Low Stock'}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
` })
export class StaffInventoryComponent {
  items = [
    { name: 'Rice', qty: 50, unit: 'kg', ok: true },
    { name: 'Wheat Flour', qty: 8, unit: 'kg', ok: false },
    { name: 'Paneer', qty: 0, unit: 'kg', ok: false },
    { name: 'Cooking Oil', qty: 20, unit: 'ltr', ok: true },
    { name: 'Tomatoes', qty: 5, unit: 'kg', ok: false },
  ];
}
