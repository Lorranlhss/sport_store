import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../domain/entities/product.entity';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    showFilters = false;

    products$ = this.productsService.products$;
    loading$ = this.productsService.loading$;
    error$ = this.productsService.error$;
    currentPage$ = this.productsService.currentPage$;
    totalPages$ = this.productsService.totalPages$;
    totalElements$ = this.productsService.totalElements$;
    filters$ = this.productsService.filters$;
    searchQuery$ = this.productsService.searchQuery$;

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        // Component initialization if needed
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSearch(query: string): void {
        this.productsService.setSearchQuery(query);
    }

    onSortChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.productsService.setSortBy(value);
    }

    onFiltersChange(filters: any): void {
        this.productsService.setFilters(filters);
    }

    onResetFilters(): void {
        this.productsService.resetFilters();
    }

    onPageChange(page: number): void {
        this.productsService.setPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onAddToCart(product: Product): void {
        // TODO: Implement cart logic
        console.log('Add to cart:', product);
    }

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }

    retry(): void {
        this.productsService.setPage(0);
    }
}