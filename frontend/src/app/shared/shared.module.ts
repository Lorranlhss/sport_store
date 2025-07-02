import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Diretivas
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';

// Pipes
import { CurrencyBrlPipe } from './pipes/currency-brl.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [
    // Components
    SpinnerComponent,
    SearchBarComponent,
    PaginationComponent,
    ErrorMessageComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    // Directives
    ClickOutsideDirective,
    LazyLoadDirective,
    // Pipes
    CurrencyBrlPipe,
    TruncatePipe,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Re-export modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Export components
    SpinnerComponent,
    SearchBarComponent,
    PaginationComponent,
    ErrorMessageComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    // Export directives
    ClickOutsideDirective,
    LazyLoadDirective,
    // Export pipes
    CurrencyBrlPipe,
    TruncatePipe,
    SearchFilterPipe
  ]
})
export class SharedModule { }
