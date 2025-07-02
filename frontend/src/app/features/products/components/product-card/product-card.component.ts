import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../../domain/entities/product.entity';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<Product>();
    @Output() toggleWishlist = new EventEmitter<Product>();

    readonly MAX_INSTALLMENTS = 12;
    readonly MIN_INSTALLMENT_VALUE = 50;

    constructor(private router: Router) {}

    get installmentValue(): number {
        const installments = this.calculateInstallments();
        return this.product.price / installments;
    }

    calculateInstallments(): number {
        const maxInstallments = Math.floor(this.product.price / this.MIN_INSTALLMENT_VALUE);
        return Math.min(maxInstallments, this.MAX_INSTALLMENTS);
    }

    onAddToCart(): void {
        if (this.product.isInStock) {
            this.addToCart.emit(this.product);
        }
    }

    onToggleWishlist(): void {
        this.toggleWishlist.emit(this.product);
    }

    navigateToDetail(): void {
        this.router.navigate(['/products', this.product.id]);
    }
}