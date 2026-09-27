import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-admin-offers', standalone: true, imports: [CommonModule], template: `
  <div class="flex-between mb-3">
    <div><h1 class="page-title">Offers & Coupons</h1><p class="page-subtitle">Create and manage discount offers</p></div>
    <button class="btn btn-primary">+ Create Offer</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px">
    <div class="card p-3" *ngFor="let o of offers" style="border-left:4px solid var(--primary)">
      <div class="flex-between mb-2">
        <span style="font-size:22px">🏷️</span>
        <span class="badge badge-success">Active</span>
      </div>
      <h4 style="font-size:16px;font-weight:700;margin-bottom:4px">{{o.code}}</h4>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">{{o.desc}}</p>
      <p style="font-size:12px;color:var(--text-muted)">Valid till: {{o.valid}}</p>
      <div style="display:flex;gap:6px;margin-top:12px">
        <button class="btn btn-outline btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  </div>
` })
export class AdminOffersComponent {
  offers = [
    { code: 'WELCOME20', desc: '20% off on first order', valid: '31 Dec 2024' },
    { code: 'LUNCH50', desc: '₹50 off on orders above ₹200', valid: '31 Oct 2024' },
    { code: 'FREESHIP', desc: 'Free delivery on all orders', valid: '15 Nov 2024' },
  ];
}
