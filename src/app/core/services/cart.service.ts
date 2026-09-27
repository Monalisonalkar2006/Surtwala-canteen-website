import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Cart, CartItem } from '../models/cart.model';
import { Food } from '../models/food.model';
import { DELIVERY_CHARGE, FREE_DELIVERY_ABOVE, STORAGE_KEYS } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class CartService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private cartSignal = signal<Cart>(this.loadCart());

  cart = this.cartSignal.asReadonly();
  itemCount = computed(() => this.cartSignal().item_count);
  totalAmount = computed(() => this.cartSignal().total_amount);

  addItem(food: Food, qty: number = 1): void {
    const cart = { ...this.cartSignal(), items: [...this.cartSignal().items] };
    const existing = cart.items.find(i => i.food.id === food.id);
    if (existing) {
      existing.quantity += qty;
      existing.item_total = existing.quantity * existing.food.price;
    } else {
      cart.items.push({ id: Date.now(), food, quantity: qty, item_total: food.price * qty });
    }
    this.recalculate(cart);
  }

  updateQty(itemId: number, qty: number): void {
    if (qty <= 0) { this.removeItem(itemId); return; }
    const cart = { ...this.cartSignal(), items: [...this.cartSignal().items] };
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;
    item.quantity = qty;
    item.item_total = qty * item.food.price;
    this.recalculate(cart);
  }

  removeItem(itemId: number): void {
    const cart = { ...this.cartSignal() };
    cart.items = cart.items.filter(i => i.id !== itemId);
    this.recalculate(cart);
  }

  clearCart(): void {
    const empty = this.emptyCart();
    this.cartSignal.set(empty);
    this.saveCart(empty);
  }

  getItemQty(foodId: number): number {
    return this.cartSignal().items.find(i => i.food.id === foodId)?.quantity ?? 0;
  }

  private recalculate(cart: Cart): void {
    cart.sub_total = cart.items.reduce((sum, i) => sum + i.item_total, 0);
    cart.delivery_charges = cart.sub_total >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
    cart.total_amount = cart.sub_total + cart.delivery_charges - (cart.discount ?? 0);
    cart.item_count = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    this.cartSignal.set({ ...cart });
    this.saveCart(cart);
  }

  private emptyCart(): Cart {
    return { items: [], sub_total: 0, delivery_charges: 0, discount: 0, total_amount: 0, item_count: 0 };
  }

  private saveCart(cart: Cart): void {
    if (!this.isBrowser) return;
    try { localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)); } catch {}
  }

  private loadCart(): Cart {
    if (!this.isBrowser) return this.emptyCart();
    try {
      const c = localStorage.getItem(STORAGE_KEYS.CART);
      return c ? JSON.parse(c) : this.emptyCart();
    } catch { return this.emptyCart(); }
  }
}
