import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  template: `
    <div class="cart-summary">
      <h2>Resumo do Pedido</h2>

      <div class="summary-line">
        <span>Itens ({{ itemCount }})</span>
        <span>{{ total | currency:'BRL' }}</span>
      </div>

      <div class="summary-line total">
        <span>Total</span>
        <span>{{ total | currency:'BRL' }}</span>
      </div>

      <button class="btn btn-primary checkout-btn" (click)="onCheckout()">
        Finalizar Compra
      </button>
    </div>
  `,
  styles: [`
    .cart-summary {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 1.25rem;
    }

    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      &.total {
        font-weight: bold;
        font-size: 18px;
        border-top: 1px solid #ddd;
        padding-top: 10px;
        margin-top: 10px;
      }
    }

    .checkout-btn {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class CartSummaryComponent {
  @Input() total!: number;
  @Input() itemCount!: number;
  @Output() checkout = new EventEmitter<void>();

  onCheckout() {
    this.checkout.emit();
  }
}
