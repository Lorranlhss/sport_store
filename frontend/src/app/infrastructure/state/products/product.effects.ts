import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import * as ProductActions from './product.actions';
import { selectFilters, selectPagination } from './product.selectors';
import { GetProductsUseCase } from '../../../domain/use-cases/get-products.use-case';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductEffects {
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ProductActions.loadProducts,
                ProductActions.setFilters,
                ProductActions.setPage,
                ProductActions.setPageSize,
                ProductActions.searchProducts
            ),
            withLatestFrom(
                this.store.select(selectPagination),
                this.store.select(selectFilters)
            ),
            switchMap(([action, pagination, filters]) => {
                const { currentPage, pageSize } = pagination;

                if (filters.searchQuery) {
                    return this.getProductsUseCase.executeSearch(
                        filters.searchQuery,
                        currentPage,
                        pageSize
                    );
                } else if (filters.category) {
                    return this.getProductsUseCase.executeByCategory(
                        filters.category,
                        currentPage,
                        pageSize
                    );
                } else if (filters.brand) {
                    return this.getProductsUseCase.executeByBrand(
                        filters.brand,
                        currentPage,
                        pageSize
                    );
                } else {
                    return this.getProductsUseCase.execute(
                        currentPage,
                        pageSize,
                        filters.sortBy
                    );
                }
            }),
            map(page => ProductActions.loadProductsSuccess({ page })),
            catchError(error => of(ProductActions.loadProductsFailure({
                error: error.message
            })))
        )
    );

    loadProductById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProductById),
            switchMap(({ id }) =>
                this.productRepository.findById(id).pipe(
                    map(product => ProductActions.loadProductByIdSuccess({ product })),
                    catchError(error => of(ProductActions.loadProductByIdFailure({
                        error: error.message
                    })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private getProductsUseCase: GetProductsUseCase,
        private productRepository: ProductRepository
    ) {}
}