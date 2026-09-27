import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-between mb-3">
      <div><h1 class="page-title">Customers</h1><p class="page-subtitle">All registered customers</p></div>
    </div>
    <div class="card">
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#f8f9fa"><th class="th">Name</th><th class="th">Email</th><th class="th">Phone</th><th class="th">Orders</th><th class="th">Status</th></tr></thead>
          <tbody>
            <tr *ngFor="let u of users" style="border-bottom:1px solid #f1f5f9">
              <td class="td" style="display:flex;align-items:center;gap:10px">
                <div style="width:34px;height:34px;background:var(--primary);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">{{u.name[0]}}</div>
                {{u.name}}
              </td>
              <td class="td">{{u.email}}</td>
              <td class="td">{{u.phone}}</td>
              <td class="td fw-600">{{u.orders}}</td>
              <td class="td"><span class="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`.th{padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase}.td{padding:14px 16px;font-size:13px}`]
})
export class AdminUsersComponent {
  users = [
    { name: 'Monali Pawar', email: 'monali@example.com', phone: '9876543210', orders: 12 },
    { name: 'Rahul Patil', email: 'rahul@example.com', phone: '9876543211', orders: 8 },
    { name: 'Smita Joshi', email: 'smita@example.com', phone: '9876543212', orders: 5 },
    { name: 'Pooja More', email: 'pooja@example.com', phone: '9876543213', orders: 3 },
  ];
}
