import { createReducer, on } from '@ngrx/store';
import { ProductState, initialProductState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
    initialProductState,

    on(ProductActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ProductActions.loadProductsSuccess, (state, { page }) => ({
        ...state,
        loading: false,
        products: page.content,
        pagination: {
            currentPage: page.number,
            totalPages: page.totalPages,
            totalElements: page.totalElements,
            pageSize: page.size
        }
    })),

    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.loadProductById, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        selectedProduct: product
    })),

    on(ProductActions.loadProductByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProductActions.setFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
        pagination: { ...state.pagination, currentPage: 0 }
    })),

    on(ProductActions.resetFilters, (state) => ({
        ...state,
        filters: initialProductState.filters,
        pagination: { ...state.pagination, currentPage: 0 }
    })),

    on(ProductActions.setPage, (state, { page }) => ({
        ...state,
        pagination: { ...state.pagination, currentPage: page }
    })),

    on(ProductActions.setPageSize, (state, { pageSize }) => ({
        ...state,
        pagination: { ...state.pagination, pageSize, currentPage: 0 }
    })),

    on(ProductActions.searchProducts, (state, { query }) => ({
        ...state,
        filters: { ...state.filters, searchQuery: query },
        pagination: { ...state.pagination, currentPage: 0 }
    }))
);