import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" [class.overlay]="overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p *ngIf="message" class="loading-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;

      &.overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        z-index: 9999;
      }
    }

    .loading-content {
      text-align: center;
    }

    .loading-spinner {
      display: inline-block;
      width: 60px;
      height: 60px;
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #3498db;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-message {
      margin-top: 20px;
      color: #666;
      font-size: 16px;
    }
  `]
})
export class LoadingComponent {
  @Input() overlay = false;
  @Input() message = 'Carregando...';
}
