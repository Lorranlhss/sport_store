import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../../domain/entities/product.entity';
import { Page } from '../../../domain/models/page.model';
import { GetProductsUseCase } from '../../../domain/use-cases/get-products.use-case';

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    sortBy: string;
    filterBy: {
        category: string | null;
        brand: string | null;
        minPrice: number | null;
        maxPrice: number | null;
        inStockOnly: boolean;
    };
    searchQuery: string;
}

@Injectable()
export class ProductsService {
    private readonly initialState: ProductsState = {
        products: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 20,
        sortBy: 'createdAt,desc',
        filterBy: {
            category: null,
            brand: null,
            minPrice: null,
            maxPrice: null,
            inStockOnly: false
        },
        searchQuery: ''
    };

    private state$ = new BehaviorSubject<ProductsState>(this.initialState);

    // Public observables
    products$ = this.state$.pipe(map(state => state.products));
    loading$ = this.state$.pipe(map(state => state.loading));
    error$ = this.state$.pipe(map(state => state.error));
    currentPage$ = this.state$.pipe(map(state => state.currentPage));
    totalPages$ = this.state$.pipe(map(state => state.totalPages));
    totalElements$ = this.state$.pipe(map(state => state.totalElements));
    filters$ = this.state$.pipe(map(state => state.filterBy));
    searchQuery$ = this.state$.pipe(map(state => state.searchQuery));

    constructor(private getProductsUseCase: GetProductsUseCase) {
        this.initializeDataStream();
    }

    private initializeDataStream(): void {
        combineLatest([
            this.state$.pipe(map(s => s.currentPage), distinctUntilChanged()),
            this.state$.pipe(map(s => s.pageSize), distinctUntilChanged()),
            this.state$.pipe(map(s => s.sortBy), distinctUntilChanged()),
            this.state$.pipe(map(s => s.filterBy), distinctUntilChanged()),
            this.state$.pipe(map(s => s.searchQuery), distinctUntilChanged(), debounceTime(300))
        ]).pipe(
            tap(() => this.updateState({ loading: true, error: null })),
            switchMap(([page, size, sort, filters, search]) => {
                if (search) {
                    return this.getProductsUseCase.executeSearch(search, page, size);
                } else if (filters.category) {
                    return this.getProductsUseCase.executeByCategory(filters.category, page, size);
                } else if (filters.brand) {
                    return this.getProductsUseCase.executeByBrand(filters.brand, page, size);
                } else {
                    return this.getProductsUseCase.execute(page, size, sort);
                }
            }),
            tap(page => this.handlePageResult(page))
        ).subscribe({
            error: (error) => this.updateState({ loading: false, error: error.message })
        });
    }

    private handlePageResult(page: Page<Product>): void {
        let products = page.content;

        // Apply client-side filters
        const filters = this.state$.value.filterBy;
        if (filters.inStockOnly) {
            products = products.filter(p => p.isInStock);
        }
        if (filters.minPrice !== null) {
            products = products.filter(p => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== null) {
            products = products.filter(p => p.price <= filters.maxPrice!);
        }

        this.updateState({
            products,
            loading: false,
            totalPages: page.totalPages,
            totalElements: page.totalElements,
            currentPage: page.number
        });
    }

    setPage(page: number): void {
        this.updateState({ currentPage: page });
    }

    setPageSize(size: number): void {
        this.updateState({ pageSize: size, currentPage: 0 });
    }

    setSortBy(sort: string): void {
        this.updateState({ sortBy: sort, currentPage: 0 });
    }

    setFilters(filters: Partial<ProductsState['filterBy']>): void {
        this.updateState({
            filterBy: { ...this.state$.value.filterBy, ...filters },
            currentPage: 0
        });
    }

    setSearchQuery(query: string): void {
        this.updateState({ searchQuery: query, currentPage: 0 });
    }

    resetFilters(): void {
        this.updateState({
            filterBy: this.initialState.filterBy,
            searchQuery: '',
            currentPage: 0
        });
    }

    private updateState(partial: Partial<ProductsState>): void {
        this.state$.next({ ...this.state$.value, ...partial });
    }
}