import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Food } from '../../../core/models/food.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 0;

  categories: Category[] = [
    { id: 0, name: 'All', icon: '🍽️', image: '', is_active: true },
    { id: 1, name: 'Thali', icon: '🍛', image: '', is_active: true },
    { id: 2, name: 'Breakfast', icon: '🥞', image: '', is_active: true },
    { id: 3, name: 'Snacks', icon: '🥨', image: '', is_active: true },
    { id: 4, name: 'Beverages', icon: '☕', image: '', is_active: true },
    { id: 5, name: 'Rice', icon: '🍚', image: '', is_active: true },
    { id: 6, name: 'Chinese', icon: '🍜', image: '', is_active: true },
    { id: 7, name: 'Desserts', icon: '🍮', image: '', is_active: true },
  ];

  allFoods: Food[] = [
    { id: 1, name: 'Veg Thali', description: 'Complete meal', price: 120, image: '', category_id: 1, is_available: true, is_veg: true, is_bestseller: true, rating: 4.5 },
    { id: 2, name: 'Paneer Butter Masala', description: 'Rich creamy paneer', price: 130, image: '', category_id: 1, is_available: true, is_veg: true, rating: 4.8 },
    { id: 3, name: 'Veg Biryani', description: 'Aromatic basmati rice', price: 110, image: '', category_id: 5, is_available: true, is_veg: true, rating: 4.3 },
    { id: 4, name: 'Masala Dosa', description: 'Crispy dosa', price: 70, image: '', category_id: 2, is_available: true, is_veg: true, rating: 4.6 },
    { id: 5, name: 'Veg Sandwich', description: 'Fresh vegetables', price: 60, image: '', category_id: 3, is_available: true, is_veg: true, rating: 4.3 },
    { id: 6, name: 'Samosa (2 pcs)', description: 'Crispy samosa', price: 20, image: '', category_id: 3, is_available: true, is_veg: true, rating: 4.5 },
    { id: 7, name: 'Veg Noodles', description: 'Stir-fried noodles', price: 80, image: '', category_id: 6, is_available: true, is_veg: true, rating: 4.4 },
    { id: 8, name: 'Tea', description: 'Freshly brewed', price: 15, image: '', category_id: 4, is_available: true, is_veg: true, rating: 4.6 },
    { id: 9, name: 'Upma', description: 'Semolina breakfast', price: 50, image: '', category_id: 2, is_available: true, is_veg: true, rating: 4.2 },
    { id: 10, name: 'Gulab Jamun', description: 'Sweet dessert', price: 30, image: '', category_id: 7, is_available: true, is_veg: true, rating: 4.7 },
    { id: 11, name: 'Fried Rice', description: 'Stir-fried rice', price: 90, image: '', category_id: 5, is_available: true, is_veg: true, rating: 4.3 },
    { id: 12, name: 'Coffee', description: 'Hot filter coffee', price: 20, image: '', category_id: 4, is_available: true, is_veg: true, rating: 4.5 },
  ];

  foodEmojis: Record<number, string> = {
    1:'🍛',2:'🧆',3:'🍚',4:'🫔',5:'🥪',6:'🥟',7:'🍜',8:'☕',9:'🍲',10:'🍮',11:'🍳',12:'☕'
  };

  get filteredFoods(): Food[] {
    return this.allFoods.filter(f => {
      const matchCat = this.selectedCategory === 0 || f.category_id === this.selectedCategory;
      const matchSearch = !this.searchQuery || f.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  constructor(public cartService: CartService, private notif: NotificationService) {}
  ngOnInit(): void {}

  addToCart(food: Food): void { this.cartService.addItem(food); this.notif.success(`${food.name} added!`); }
  getQty(id: number): number { return this.cartService.getItemQty(id); }
  incQty(food: Food): void { this.cartService.addItem(food, 1); }
  decQty(food: Food): void {
    const item = this.cartService.cart().items.find(i => i.food.id === food.id);
    if (item) this.cartService.updateQty(item.id, item.quantity - 1);
  }
}
