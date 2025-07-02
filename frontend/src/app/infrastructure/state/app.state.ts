import { ProductState } from './products/product.state';
import { CartState } from './cart/cart.state';

export interface AppState {
    products: ProductState;
    cart: CartState;
}