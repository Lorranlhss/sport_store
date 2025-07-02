export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stockQuantity: number;
}

export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    loading: boolean;
    error: string | null;
}

export const initialCartState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null
};