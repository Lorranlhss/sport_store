import { Injectable } from '@angular/core';
import { Product } from '../../domain/entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductMapper {
  toDomain(dto: any): Product {
    return new Product(
      dto.id,
      dto.name,
      dto.description,
      dto.price,
      dto.originalPrice,
      dto.stockQuantity,
      dto.sku,
      dto.active,
      dto.images || [],
      dto.categories || [],
      dto.brand,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }

  toDto(product: Product): any {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      stockQuantity: product.stockQuantity,
      sku: product.sku,
      brand: product.brand,
      categories: product.categories,
      images: product.images
    };
  }
}
