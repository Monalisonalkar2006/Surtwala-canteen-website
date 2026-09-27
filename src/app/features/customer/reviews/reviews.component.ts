import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="page-title">My Reviews</h1>
    <p class="page-subtitle">Reviews you've written for food items</p>
    <div style="text-align:center;padding:60px 20px;background:white;border-radius:16px;margin-top:20px">
      <div style="font-size:60px;margin-bottom:16px">⭐</div>
      <h3 style="font-size:20px;margin-bottom:8px">No Reviews Yet</h3>
      <p style="color:var(--text-muted)">After completing an order, you can review the food items here.</p>
    </div>
  `,
})
export class ReviewsComponent {}
