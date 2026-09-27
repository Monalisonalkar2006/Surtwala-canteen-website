import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-between mb-3">
      <div><h1 class="page-title">Staff Management</h1><p class="page-subtitle">Manage canteen staff</p></div>
      <button class="btn btn-primary">+ Add Staff</button>
    </div>
    <div class="staff-grid">
      <div class="card p-3 staff-card" *ngFor="let s of staff">
        <div class="avatar" [style.background]="s.color">{{s.name[0]}}</div>
        <h4>{{s.name}}</h4>
        <p>{{s.role}}</p>
        <p class="text-muted" style="font-size:12px">{{s.phone}}</p>
        <div style="display:flex;gap:6px;margin-top:10px">
          <button class="btn btn-outline btn-sm">Edit</button>
          <button class="btn btn-danger btn-sm">Remove</button>
        </div>
      </div>
    </div>
  `,
  styles: [`.staff-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}.staff-card{text-align:center;transition:var(--transition)}.staff-card:hover{transform:translateY(-3px)}.avatar{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:white;margin:0 auto 12px}.staff-card h4{font-size:15px;font-weight:700;margin-bottom:4px}.staff-card p{font-size:13px;color:var(--text-secondary);margin-bottom:3px}`]
})
export class AdminStaffComponent {
  staff = [
    { name: 'Raju Thakur', role: 'Chef', phone: '9876543214', color: '#2d6a4f' },
    { name: 'Sunita More', role: 'Counter Staff', phone: '9876543215', color: '#4361ee' },
    { name: 'Kishor Patil', role: 'Delivery', phone: '9876543216', color: '#f4a261' },
  ];
}
