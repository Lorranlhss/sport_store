import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productReducer } from './products/product.reducer';
import { ProductEffects } from './products/product.effects';
import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        StoreModule.forRoot({
            products: productReducer
        }),
        EffectsModule.forRoot([ProductEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true
        })
    ]
})
export class StateModule { }