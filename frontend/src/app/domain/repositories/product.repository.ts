import { Observable } from 'rxjs';
import { Product } from '../entities/product.entity';
import { Page } from '../models/page.model';

export abstract class ProductRepository {
  abstract findAll(page: number, size: number, sort?: string): Observable<Page<Product>>;
  abstract findById(id: string): Observable<Product>;
  abstract findByCategory(category: string, page: number, size: number): Observable<Page<Product>>;
  abstract findByBrand(brand: string, page: number, size: number): Observable<Page<Product>>;
  abstract search(query: string, page: number, size: number): Observable<Page<Product>>;
  abstract create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product>;
}
