import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1 class="page-title">Favorites</h1>
    <p class="page-subtitle">Your saved favourite items</p>
    <div class="empty-box" style="text-align:center;padding:60px 20px;background:white;border-radius:16px;margin-top:20px">
      <div style="font-size:60px;margin-bottom:16px">❤️</div>
      <h3 style="font-size:20px;margin-bottom:8px">No Favorites Yet</h3>
      <p style="color:var(--text-muted);margin-bottom:20px">Tap the heart icon on any food item to save it here.</p>
      <a routerLink="/customer/menu" class="btn btn-primary">Browse Menu</a>
    </div>
  `,
})
export class FavoritesComponent {}
