import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nav class="pagination" *ngIf="totalPages > 1">
      <button
        class="pagination-button"
        [disabled]="currentPage === 0"
        (click)="onPageChange(0)">
        <i class="fas fa-angle-double-left"></i>
      </button>

      <button
        class="pagination-button"
        [disabled]="currentPage === 0"
        (click)="onPageChange(currentPage - 1)">
        <i class="fas fa-angle-left"></i>
      </button>

      <div class="pagination-numbers">
        <button
          *ngFor="let page of visiblePages"
          class="pagination-number"
          [class.active]="page === currentPage"
          (click)="onPageChange(page)">
          {{ page + 1 }}
        </button>
      </div>

      <button
        class="pagination-button"
        [disabled]="currentPage === totalPages - 1"
        (click)="onPageChange(currentPage + 1)">
        <i class="fas fa-angle-right"></i>
      </button>

      <button
        class="pagination-button"
        [disabled]="currentPage === totalPages - 1"
        (click)="onPageChange(totalPages - 1)">
        <i class="fas fa-angle-double-right"></i>
      </button>

      <div class="pagination-info">
        Página {{ currentPage + 1 }} de {{ totalPages }}
      </div>
    </nav>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 40px 0;
      flex-wrap: wrap;
    }

    .pagination-button,
    .pagination-number {
      min-width: 40px;
      height: 40px;
      padding: 0 12px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: #f8f9fa;
        border-color: #3498db;
        color: #3498db;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.active {
        background: #3498db;
        color: white;
        border-color: #3498db;
      }
    }

    .pagination-numbers {
      display: flex;
      gap: 4px;
    }

    .pagination-info {
      margin-left: 20px;
      color: #666;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .pagination {
        gap: 4px;
      }

      .pagination-info {
        width: 100%;
        text-align: center;
        margin: 10px 0 0 0;
      }
    }
  `]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() maxVisiblePages = 5;
  @Output() pageChange = new EventEmitter<number>();

  visiblePages: number[] = [];

  ngOnChanges(): void {
    this.calculateVisiblePages();
  }

  calculateVisiblePages(): void {
    const pages: number[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(0, this.currentPage - half);
    let end = Math.min(this.totalPages - 1, start + this.maxVisiblePages - 1);

    if (end - start < this.maxVisiblePages - 1) {
      start = Math.max(0, end - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.visiblePages = pages;
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
