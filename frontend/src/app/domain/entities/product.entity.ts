export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly originalPrice: number | null,
    public readonly stockQuantity: number,
    public readonly sku: string,
    public readonly active: boolean,
    public readonly images: string[],
    public readonly categories: string[],
    public readonly brand: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  get discountPercentage(): number {
    if (!this.originalPrice || this.originalPrice <= this.price) {
      return 0;
    }
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  get isInStock(): boolean {
    return this.stockQuantity > 0 && this.active;
  }

  get hasDiscount(): boolean {
    return this.discountPercentage > 0;
  }

  canBePurchased(quantity: number): boolean {
    return this.isInStock && this.stockQuantity >= quantity;
  }
}
