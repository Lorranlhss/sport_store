import { createAction, props } from '@ngrx/store';
import { Product } from '../../../domain/entities/product.entity';
import { Page } from '../../../domain/models/page.model';
import {ProductState} from "./product.state";

export const loadProducts = createAction(
    '[Product List] Load Products'
);

export const loadProductsSuccess = createAction(
    '[Product API] Load Products Success',
    props<{ page: Page<Product> }>()
);

export const loadProductsFailure = createAction(
    '[Product API] Load Products Failure',
    props<{ error: string }>()
);

export const loadProductById = createAction(
    '[Product Detail] Load Product By Id',
    props<{ id: string }>()
);

export const loadProductByIdSuccess = createAction(
    '[Product API] Load Product By Id Success',
    props<{ product: Product }>()
);

export const loadProductByIdFailure = createAction(
    '[Product API] Load Product By Id Failure',
    props<{ error: string }>()
);

export const setFilters = createAction(
    '[Product Filters] Set Filters',
    props<{ filters: Partial<ProductState['filters']> }>()
);

export const resetFilters = createAction(
    '[Product Filters] Reset Filters'
);

export const setPage = createAction(
    '[Product Pagination] Set Page',
    props<{ page: number }>()
);

export const setPageSize = createAction(
    '[Product Pagination] Set Page Size',
    props<{ pageSize: number }>()
);

export const searchProducts = createAction(
    '[Product Search] Search Products',
    props<{ query: string }>()
);