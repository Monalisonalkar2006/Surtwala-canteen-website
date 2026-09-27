import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Food } from '../../../core/models/food.model';
import { Category } from '../../../core/models/category.model';
import { CartService } from '../../../core/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  searchQuery = '';
  currentBanner = 0;

  categories: Category[] = [
    { id: 1, name: 'Thali', image: '', icon: '🍛', is_active: true },
    { id: 2, name: 'Breakfast', image: '', icon: '🥞', is_active: true },
    { id: 3, name: 'Snacks', image: '', icon: '🥨', is_active: true },
    { id: 4, name: 'Beverages', image: '', icon: '☕', is_active: true },
    { id: 5, name: 'Rice', image: '', icon: '🍚', is_active: true },
    { id: 6, name: 'Chinese', image: '', icon: '🍜', is_active: true },
    { id: 7, name: 'Desserts', image: '', icon: '🍮', is_active: true },
  ];

  todaySpecials: Food[] = [
    { id: 1, name: 'Veg Thali', description: 'Complete meal with dal, sabji, roti & rice', price: 120, image: '', category_id: 1, is_available: true, is_veg: true, is_bestseller: true, rating: 4.5, review_count: 120 },
    { id: 2, name: 'Paneer Butter Masala', description: 'Rich creamy paneer in tomato gravy', price: 130, image: '', category_id: 1, is_available: true, is_veg: true, rating: 4.8, review_count: 95 },
    { id: 3, name: 'Veg Biryani', description: 'Aromatic basmati rice with vegetables', price: 110, image: '', category_id: 5, is_available: true, is_veg: true, rating: 4.3, review_count: 80 },
    { id: 4, name: 'Masala Dosa', description: 'Crispy dosa with spiced potato filling', price: 70, image: '', category_id: 2, is_available: true, is_veg: true, rating: 4.6, review_count: 110 },
  ];

  popularItems: Food[] = [
    { id: 5, name: 'Veg Sandwich', description: 'Fresh vegetables with mint chutney', price: 60, image: '', category_id: 3, is_available: true, is_veg: true, rating: 4.3, review_count: 65 },
    { id: 6, name: 'Samosa (2 pcs)', description: 'Crispy samosa with spiced filling', price: 20, image: '', category_id: 3, is_available: true, is_veg: true, rating: 4.5, review_count: 89 },
    { id: 7, name: 'Veg Noodles', description: 'Stir-fried noodles with vegetables', price: 80, image: '', category_id: 6, is_available: true, is_veg: true, rating: 4.4, review_count: 74 },
    { id: 8, name: 'Tea', description: 'Freshly brewed ginger tea', price: 15, image: '', category_id: 4, is_available: true, is_veg: true, rating: 4.6, review_count: 200 },
  ];

  foodEmojis: Record<number, string> = {
    1: '🍛', 2: '🧆', 3: '🍚', 4: '🫔', 5: '🥪', 6: '🥟', 7: '🍜', 8: '☕'
  };

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private notif: NotificationService
  ) {}

  ngOnInit(): void {
    setInterval(() => { this.currentBanner = (this.currentBanner + 1) % 3; }, 4000);
  }

  addToCart(food: Food): void {
    this.cartService.addItem(food);
    this.notif.success(`${food.name} added to cart!`);
  }

  getQty(foodId: number): number {
    return this.cartService.getItemQty(foodId);
  }

  incrementQty(food: Food): void { this.cartService.addItem(food, 1); }
  decrementQty(food: Food): void {
    const item = this.cartService.cart().items.find(i => i.food.id === food.id);
    if (item) this.cartService.updateQty(item.id, item.quantity - 1);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Will navigate to menu with search query
    }
  }

  greetUser(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }
}
