import { Product } from '../../../domain/entities/product.entity';

export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalElements: number;
        pageSize: number;
    };
    filters: {
        category: string | null;
        brand: string | null;
        minPrice: number | null;
        maxPrice: number | null;
        searchQuery: string;
        sortBy: string;
    };
}

export const initialProductState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 20
    },
    filters: {
        category: null,
        brand: null,
        minPrice: null,
        maxPrice: null,
        searchQuery: '',
        sortBy: 'createdAt,desc'
    }
};