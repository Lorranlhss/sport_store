import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
    selectProductState,
    (state) => state.products
);

export const selectProductsLoading = createSelector(
    selectProductState,
    (state) => state.loading
);

export const selectProductsError = createSelector(
    selectProductState,
    (state) => state.error
);

export const selectSelectedProduct = createSelector(
    selectProductState,
    (state) => state.selectedProduct
);

export const selectPagination = createSelector(
    selectProductState,
    (state) => state.pagination
);

export const selectFilters = createSelector(
    selectProductState,
    (state) => state.filters
);

export const selectFilteredProducts = createSelector(
    selectAllProducts,
    selectFilters,
    (products, filters) => {
        let filtered = [...products];

        if (filters.minPrice !== null) {
            filtered = filtered.filter(p => p.price >= filters.minPrice!);
        }

        if (filters.maxPrice !== null) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice!);
        }

        return filtered;
    }
);