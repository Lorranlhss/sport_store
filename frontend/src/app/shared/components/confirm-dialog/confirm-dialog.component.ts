import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="dialog-backdrop" (click)="onCancel()">
      <div class="dialog" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <h3>{{ title }}</h3>
          <button class="close-button" (click)="onCancel()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="dialog-body">
          <p>{{ message }}</p>
        </div>

        <div class="dialog-footer">
          <button class="button button-secondary" (click)="onCancel()">
            {{ cancelText }}
          </button>
          <button class="button button-primary" (click)="onConfirm()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }

    .dialog {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow: auto;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid #eee;

      h3 {
        margin: 0;
        font-size: 20px;
      }
    }

    .close-button {
      background: none;
      border: none;
      font-size: 20px;
      color: #999;
      cursor: pointer;

      &:hover {
        color: #333;
      }
    }

    .dialog-body {
      padding: 20px;

      p {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
      }
    }

    .dialog-footer {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      padding: 20px;
      border-top: 1px solid #eee;
    }

    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;

      &-primary {
        background: #3498db;
        color: white;

        &:hover {
          background: #2980b9;
        }
      }

      &-secondary {
        background: #ecf0f1;
        color: #333;

        &:hover {
          background: #bdc3c7;
        }
      }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirmar';
  @Input() message = 'Tem certeza que deseja continuar?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
