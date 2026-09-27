import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-admin-reviews', standalone: true, imports: [CommonModule], template: `
  <h1 class="page-title mb-1">Feedback & Reviews</h1>
  <p class="page-subtitle mb-3">Customer reviews for food items</p>
  <div style="display:flex;flex-direction:column;gap:12px">
    <div class="card p-3" *ngFor="let r of reviews">
      <div class="flex-between mb-2">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;background:var(--primary);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700">{{r.user[0]}}</div>
          <div><div class="fw-600">{{r.user}}</div><div style="font-size:11px;color:var(--text-muted)">{{r.food}}</div></div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-primary btn-sm">Approve</button>
          <button class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
      <div style="font-size:14px;color:var(--text-secondary);margin-bottom:6px">"{{r.comment}}"</div>
      <div style="font-size:13px;color:#ffc107">{{ '⭐'.repeat(r.rating) }}</div>
    </div>
  </div>
` })
export class AdminReviewsComponent {
  reviews = [
    { user: 'Monali Pawar', food: 'Veg Thali', rating: 5, comment: 'Excellent food! Very tasty and hygienic.' },
    { user: 'Rahul Patil', food: 'Masala Dosa', rating: 4, comment: 'Very crispy and delicious.' },
    { user: 'Smita Joshi', food: 'Tea', rating: 5, comment: 'Best tea I have ever had!' },
  ];
}
