import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$ = this.cartService.items$;
  total$ = this.cartService.total$;
  itemCount$ = this.cartService.itemCount$;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize cart if needed
  }

  onUpdateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.productId, quantity);
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeItem(item.productId);
  }

  onClearCart(): void {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
      this.cartService.clearCart();
    }
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  onContinueShopping(): void {
    this.router.navigate(['/products']);
  }
}
