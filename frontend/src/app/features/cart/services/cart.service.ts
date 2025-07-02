import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  items$ = this.itemsSubject.asObservable();

  total$ = this.items$.pipe(
    map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
  );

  itemCount$ = this.items$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  constructor() {}

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const items = this.itemsSubject.value;
    const existingItem = items.find(i => i.productId === item.productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.saveCart(items);
  }

  updateQuantity(productId: string, quantity: number): void {
    const items = this.itemsSubject.value;
    const item = items.find(i => i.productId === productId);

    if (item && quantity > 0) {
      item.quantity = quantity;
      this.saveCart(items);
    }
  }

  removeItem(productId: string): void {
    const items = this.itemsSubject.value.filter(i => i.productId !== productId);
    this.saveCart(items);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }
}
