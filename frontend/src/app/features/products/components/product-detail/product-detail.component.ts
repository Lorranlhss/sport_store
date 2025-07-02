import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Product } from '../../../../domain/entities/product.entity';
import { ProductRepository } from '../../../../domain/repositories/product.repository';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    product: Product | null = null;
    loading = true;
    error: string | null = null;
    quantity = 1;
    selectedImage = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productRepository: ProductRepository
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            takeUntil(this.destroy$),
            switchMap(params => {
                const id = params.get('id');
                if (!id) {
                    throw new Error('Product ID not found');
                }
                return this.productRepository.findById(id);
            })
        ).subscribe({
            next: (product) => {
                this.product = product;
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message;
                this.loading = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    incrementQuantity(): void {
        if (this.product && this.quantity < this.product.stockQuantity) {
            this.quantity++;
        }
    }

    decrementQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart(): void {
        if (this.product && this.product.canBePurchased(this.quantity)) {
            // TODO: Implement add to cart
            console.log('Add to cart:', this.product, 'Quantity:', this.quantity);
        }
    }

    selectImage(index: number): void {
        this.selectedImage = index;
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }
}