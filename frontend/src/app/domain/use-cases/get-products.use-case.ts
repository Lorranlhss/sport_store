import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../entities/product.entity';
import { Page } from '../models/page.model';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(page: number = 0, size: number = 20, sort?: string): Observable<Page<Product>> {
    return this.productRepository.findAll(page, size, sort);
  }

  executeByCategory(category: string, page: number = 0, size: number = 20): Observable<Page<Product>> {
    return this.productRepository.findByCategory(category, page, size);
  }

  executeByBrand(brand: string, page: number = 0, size: number = 20): Observable<Page<Product>> {
    return this.productRepository.findByBrand(brand, page, size);
  }

  executeSearch(query: string, page: number = 0, size: number = 20): Observable<Page<Product>> {
    return this.productRepository.search(query, page, size);
  }
}
