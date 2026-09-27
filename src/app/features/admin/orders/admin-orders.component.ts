import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-between mb-3">
      <div><h1 class="page-title">Order Management</h1><p class="page-subtitle">Manage all orders</p></div>
    </div>
    <div class="card">
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr style="background:#f8f9fa">
            <th class="th">Order ID</th><th class="th">Date</th><th class="th">Time</th><th class="th">Customer</th><th class="th">Status</th><th class="th">Action</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let o of orders" style="border-bottom:1px solid #f1f5f9;transition:.15s" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
              <td class="td fw-700" style="color:var(--primary)">{{o.id}}</td>
              <td class="td">{{o.date}}</td>
              <td class="td" style="color:var(--text-muted)">{{o.time}}</td>
              <td class="td">{{o.customer}}</td>
              <td class="td">
                <span style="padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:capitalize"
                  [style.background]="statusBg(o.status)" [style.color]="statusColor(o.status)">
                  {{o.status}}
                </span>
              </td>
              <td class="td">
                <select style="border:1.5px solid #e9ecef;border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer">
                  <option>New</option><option>Preparing</option><option>Ready</option><option>Completed</option><option>Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`.th{padding:12px 16px;text-align:left;font-size:12px;color:var(--text-muted);font-weight:600;text-transform:uppercase;white-space:nowrap}.td{padding:14px 16px;font-size:13px;white-space:nowrap}`]
})
export class AdminOrdersComponent {
  orders = [
    { id: '#ORD1245', date: '22 May 2024', time: '10:30 AM', customer: 'Monali Pawar', status: 'new' },
    { id: '#ORD1244', date: '22 May 2024', time: '10:20 AM', customer: 'Rahul Patil', status: 'preparing' },
    { id: '#ORD1243', date: '22 May 2024', time: '10:05 AM', customer: 'Smita Joshi', status: 'ready' },
    { id: '#ORD1242', date: '21 May 2024', time: '09:55 AM', customer: 'Vedant Shinde', status: 'completed' },
    { id: '#ORD1241', date: '21 May 2024', time: '09:40 AM', customer: 'Pooja More', status: 'cancelled' },
  ];
  statusBg = (s: string) => ({new:'#dbeafe',preparing:'#fff3cd',ready:'#d8f3dc',completed:'#d8f3dc',cancelled:'#fde8e8'})[s]||'#f1f5f9';
  statusColor = (s: string) => ({new:'#4361ee',preparing:'#e76f51',ready:'#2d6a4f',completed:'#52b788',cancelled:'#e63946'})[s]||'#64748b';
}
