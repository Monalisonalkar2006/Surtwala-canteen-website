import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div style="max-width:600px;margin:0 auto">
      <a routerLink="/customer/cart" style="color:var(--primary);font-size:14px;font-weight:600;text-decoration:none">← Back to Cart</a>
      <h1 class="page-title mt-2">Checkout</h1>
      <div class="card p-3 mt-3">
        <h3 class="fw-700 mb-2">Payment Method</h3>
        <div class="pay-methods">
          <label class="pay-opt" *ngFor="let m of methods">
            <input type="radio" name="pay" [value]="m.value" [(ngModel)]="selectedMethod" />
            <span>{{ m.icon }} {{ m.label }}</span>
          </label>
        </div>
      </div>
      <div class="card p-3 mt-2">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>Subtotal</span><span>₹{{ cart.sub_total }}</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span>Delivery</span><span>₹{{ cart.delivery_charges }}</span></div>
        <hr style="margin:10px 0">
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800"><span>Total</span><span style="color:var(--primary)">₹{{ cart.total_amount }}</span></div>
      </div>
      <button class="btn btn-primary btn-block btn-lg mt-2">Place Order 🎉</button>
    </div>
  `,
  styles: [`.pay-opt{display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid var(--border-color);border-radius:10px;cursor:pointer;margin-bottom:8px;font-size:14px;font-weight:500} .pay-opt:has(input:checked){border-color:var(--primary);background:#f0faf4} .pay-methods{}`]
})
export class CheckoutComponent {
  selectedMethod = 'cash';
  methods = [
    { value: 'cash', label: 'Cash on Delivery', icon: '💵' },
    { value: 'upi', label: 'UPI', icon: '📱' },
    { value: 'card', label: 'Card', icon: '💳' },
  ];
  get cart() { return this.cartService.cart(); }
  constructor(public cartService: CartService) {}
}
