import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/api/v1/orders`;

  constructor(private http: HttpClient) {}

  processOrder(order: any): Promise<any> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ orderId: Date.now().toString(), status: 'success' });
      }, 2000);
    });

    // Real implementation would be:
    // return this.http.post(this.apiUrl, order).toPromise();
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }
}
