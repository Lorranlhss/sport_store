import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="error-message" [class]="'error-' + type">
      <i class="fas" [ngClass]="iconClass"></i>
      <div class="error-content">
        <h4 *ngIf="title">{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <button *ngIf="showRetry" (click)="retry.emit()" class="retry-button">
        <i class="fas fa-redo"></i> Tentar novamente
      </button>
      <button *ngIf="dismissible" (click)="dismiss.emit()" class="dismiss-button">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .error-message {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 20px;
      border-radius: 8px;
      position: relative;
      margin: 20px 0;

      &.error-error {
        background: #fee;
        color: #c33;
        border: 1px solid #fcc;
      }

      &.error-warning {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
      }

      &.error-info {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
      }

      &.error-success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
    }

    .error-content {
      flex: 1;

      h4 {
        margin: 0 0 5px 0;
        font-size: 18px;
      }

      p {
        margin: 0;
        font-size: 14px;
      }
    }

    .retry-button {
      padding: 8px 16px;
      background: white;
      border: 1px solid currentColor;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;

      &:hover {
        background: currentColor;
        color: white;
      }
    }

    .dismiss-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: currentColor;
      cursor: pointer;
      font-size: 18px;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  `]
})
export class ErrorMessageComponent {
  @Input() type: 'error' | 'warning' | 'info' | 'success' = 'error';
  @Input() title = '';
  @Input() message = '';
  @Input() showRetry = false;
  @Input() dismissible = false;
  @Output() retry = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  get iconClass(): string {
    const icons = {
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle',
      success: 'fa-check-circle'
    };
    return icons[this.type];
  }
}
