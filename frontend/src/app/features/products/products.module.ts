import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';

// Routing
import { ProductsRoutingModule } from './products-routing.module';

// Services
import { ProductsService } from './services/products.service';

// Use Cases
import { GetProductsUseCase } from '../../domain/use-cases/get-products.use-case';

// Repository
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductApiService } from '../../infrastructure/api/product-api.service';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailComponent,
        ProductFiltersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        ProductsRoutingModule
    ],
    providers: [
        ProductsService,
        GetProductsUseCase,
        {
            provide: ProductRepository,
            useClass: ProductApiService
        }
    ],
    exports: [
        ProductListComponent,
        ProductCardComponent
    ]
})
export class ProductsModule { }