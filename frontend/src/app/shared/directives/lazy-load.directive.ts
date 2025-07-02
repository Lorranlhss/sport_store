import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective {
  @Input() appLazyLoad = '';
  @Input() errorImage = 'assets/images/no-image.png';
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();

  @HostBinding('attr.src') srcAttr = '';

  constructor(private el: ElementRef<HTMLImageElement>) {
    this.setupLazyLoad();
  }

  private setupLazyLoad(): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.disconnect();
          }
        });
      });

      observer.observe(this.el.nativeElement);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.loadImage();
    }
  }

  private loadImage(): void {
    const img = new Image();

    img.onload = () => {
      this.srcAttr = this.appLazyLoad;
      this.loaded.emit();
    };

    img.onerror = () => {
      this.srcAttr = this.errorImage;
      this.error.emit();
    };

    img.src = this.appLazyLoad;
  }
}
