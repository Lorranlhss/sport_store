// Modelo que representa um item no carrinho
export interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    brand: string;
  };
  quantity: number;
}
