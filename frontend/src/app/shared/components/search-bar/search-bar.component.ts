import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-bar" [class.focused]="isFocused">
      <i class="fas fa-search search-icon"></i>
      <input
        type="text"
        [formControl]="searchControl"
        [placeholder]="placeholder"
        (focus)="isFocused = true"
        (blur)="isFocused = false"
        class="search-input">
      <button
        *ngIf="searchControl.value"
        (click)="clear()"
        class="clear-button"
        type="button">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 0 15px;
      transition: all 0.3s ease;

      &.focused {
        border-color: #3498db;
        background: white;
        box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
      }
    }

    .search-icon {
      color: #999;
      margin-right: 10px;
    }

    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 12px 0;
      font-size: 16px;
      outline: none;

      &::placeholder {
        color: #999;
      }
    }

    .clear-button {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #666;
      }
    }
  `]
})
export class SearchBarComponent implements OnInit {
  @Input() value = '';
  @Input() placeholder = 'Buscar produtos...';
  @Input() debounce = 300;
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');
  isFocused = false;

  ngOnInit(): void {
    this.searchControl.setValue(this.value);

    this.searchControl.valueChanges.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value || '');
    });
  }

  clear(): void {
    this.searchControl.setValue('');
    this.search.emit('');
  }
}
