import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    private readonly TIMEOUT = 30000; // 30 seconds
    private readonly RETRY_COUNT = 2;
    private readonly RETRY_DELAY = 1000;

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Clone the request and add headers
        const apiReq = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        return next.handle(apiReq).pipe(
            timeout(this.TIMEOUT),
            retry({
                count: this.RETRY_COUNT,
                delay: this.RETRY_DELAY,
                resetOnSuccess: true
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Server-side error
            switch (error.status) {
                case 0:
                    errorMessage = 'Não foi possível conectar ao servidor';
                    break;
                case 400:
                    errorMessage = error.error?.message || 'Requisição inválida';
                    break;
                case 401:
                    errorMessage = 'Não autorizado';
                    break;
                case 403:
                    errorMessage = 'Acesso negado';
                    break;
                case 404:
                    errorMessage = 'Recurso não encontrado';
                    break;
                case 500:
                    errorMessage = 'Erro interno do servidor';
                    break;
                default:
                    errorMessage = `Erro ${error.status}: ${error.message}`;
            }
        }

        console.error('API Error:', errorMessage, error);
        return throwError(() => new Error(errorMessage));
    }
}