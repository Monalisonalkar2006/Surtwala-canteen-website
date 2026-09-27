import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-page">
      <div class="page-header">
        <a routerLink="/customer/home" class="back-btn">← Back</a>
        <h1 class="page-title">My Cart</h1>
      </div>

      <div class="cart-empty" *ngIf="cartService.itemCount() === 0">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some delicious food to get started!</p>
        <a routerLink="/customer/menu" class="btn btn-primary">Browse Menu</a>
      </div>

      <div class="cart-content" *ngIf="cartService.itemCount() > 0">
        <div class="cart-items">
          <div class="cart-item" *ngFor="let item of cartService.cart().items">
            <div class="item-emoji">🍽️</div>
            <div class="item-info">
              <h4>{{ item.food.name }}</h4>
              <p>₹{{ item.food.price }} each</p>
            </div>
            <div class="qty-control">
              <button class="qty-btn" (click)="decrease(item.id, item.quantity)">−</button>
              <span>{{ item.quantity }}</span>
              <button class="qty-btn" (click)="cartService.updateQty(item.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">₹{{ item.item_total }}</div>
            <button class="remove-btn" (click)="cartService.removeItem(item.id)" aria-label="Remove">🗑️</button>
          </div>
        </div>

        <div class="cart-summary card p-3">
          <h3 class="fw-700 mb-2">Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>₹{{ cartService.cart().sub_total }}</span></div>
          <div class="summary-row"><span>Delivery Charges</span><span>₹{{ cartService.cart().delivery_charges }}</span></div>
          <div class="summary-row total"><span>Total Amount</span><span class="total-amt">₹{{ cartService.cart().total_amount }}</span></div>
          <a routerLink="/customer/checkout" class="btn btn-primary btn-block btn-lg mt-2">
            Proceed to Checkout →
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page { max-width: 700px; margin: 0 auto; }
    .page-header { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
    .back-btn { color: var(--primary); font-size: 14px; font-weight: 600; text-decoration: none; }
    .cart-empty { text-align: center; padding: 48px 20px; }
    .empty-icon { font-size: 64px; margin-bottom: 16px; }
    .cart-empty h3 { font-size: 20px; margin-bottom: 8px; }
    .cart-empty p { color: var(--text-muted); margin-bottom: 20px; }
    .cart-content { display: flex; flex-direction: column; gap: 16px; }
    .cart-items { display: flex; flex-direction: column; gap: 10px; }
    .cart-item { background: white; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm); }
    .item-emoji { font-size: 32px; flex-shrink: 0; }
    .item-info { flex: 1; }
    .item-info h4 { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
    .item-info p { font-size: 12px; color: var(--text-muted); }
    .qty-control { display: flex; align-items: center; gap: 8px; background: #f8f9fa; border-radius: 8px; padding: 3px 6px; }
    .qty-control span { font-size: 14px; font-weight: 700; min-width: 20px; text-align: center; }
    .qty-btn { background: var(--primary); color: white; border: none; width: 24px; height: 24px; border-radius: 6px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .item-total { font-size: 15px; font-weight: 700; color: var(--text-primary); min-width: 60px; text-align: right; }
    .remove-btn { background: none; border: none; font-size: 16px; cursor: pointer; opacity: .5; }
    .remove-btn:hover { opacity: 1; }
    .summary-row { display: flex; justify-content: space-between; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .summary-row.total { border-bottom: none; font-weight: 700; font-size: 16px; padding-top: 12px; }
    .total-amt { color: var(--primary); font-size: 18px; }
  `]
})
export class CartComponent {
  constructor(public cartService: CartService, private notif: NotificationService) {}
  decrease(itemId: number, qty: number) { this.cartService.updateQty(itemId, qty - 1); }
}
