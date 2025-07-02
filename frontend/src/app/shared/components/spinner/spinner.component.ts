import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-container" [class.fullscreen]="fullscreen">
      <div class="spinner" [class.small]="size === 'small'" [class.large]="size === 'large'"></div>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;

      &.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        z-index: 9999;
      }
    }

    .spinner {
      display: inline-block;
      width: 50px;
      height: 50px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;

      &.small {
        width: 30px;
        height: 30px;
        border-width: 2px;
      }

      &.large {
        width: 70px;
        height: 70px;
        border-width: 4px;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .spinner-message {
      margin-top: 10px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullscreen = false;
  @Input() message = '';
}
