import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Page } from '../../domain/models/page.model';
import { ProductMapper } from '../mappers/product.mapper';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductApiService extends ProductRepository {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/products`;

  constructor(
    private http: HttpClient,
    private mapper: ProductMapper
  ) {
    super();
  }

  findAll(page: number, size: number, sort?: string): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort || 'createdAt,desc');

    return this.http.get<any>(`${this.apiUrl}`, { params })
      .pipe(
        map(response => this.mapPageResponse(response))
      );
  }

  findById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(dto => this.mapper.toDomain(dto))
      );
  }

  findByCategory(category: string, page: number, size: number): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/category/${category}`, { params })
      .pipe(
        map(response => this.mapPageResponse(response))
      );
  }

  findByBrand(brand: string, page: number, size: number): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/brand/${brand}`, { params })
      .pipe(
        map(response => this.mapPageResponse(response))
      );
  }

  search(query: string, page: number, size: number): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => this.mapPageResponse(response))
      );
  }

  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const dto = this.mapper.toDto(product as any);
    return this.http.post<any>(`${this.apiUrl}`, dto)
      .pipe(
        map(response => this.mapper.toDomain(response))
      );
  }

  private mapPageResponse(response: any): Page<Product> {
    return {
      ...response,
      content: response.content.map((dto: any) => this.mapper.toDomain(dto))
    };
  }
}
