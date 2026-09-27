import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-between mb-3">
      <div><h1 class="page-title">Categories</h1><p class="page-subtitle">Manage food categories</p></div>
      <button class="btn btn-primary">+ Add Category</button>
    </div>
    <div class="cats-grid">
      <div class="cat-admin-card card p-3" *ngFor="let c of categories">
        <div style="font-size:36px;margin-bottom:10px">{{c.icon}}</div>
        <h4 style="font-size:15px;font-weight:700;margin-bottom:4px">{{c.name}}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">{{c.count}} items</p>
        <div style="display:flex;gap:6px">
          <button class="btn btn-outline btn-sm">Edit</button>
          <button class="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`.cats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px}.cat-admin-card{text-align:center;transition:var(--transition)}.cat-admin-card:hover{transform:translateY(-3px)}`]
})
export class AdminCategoriesComponent {
  categories = [
    { name: 'Thali', icon: '🍛', count: 3 },
    { name: 'Breakfast', icon: '🥞', count: 5 },
    { name: 'Snacks', icon: '🥨', count: 4 },
    { name: 'Beverages', icon: '☕', count: 6 },
    { name: 'Rice', icon: '🍚', count: 3 },
    { name: 'Chinese', icon: '🍜', count: 4 },
    { name: 'Desserts', icon: '🍮', count: 3 },
  ];
}
