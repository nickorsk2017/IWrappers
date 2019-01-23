import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

@Component({
  selector: 'panel-of-variants',
  templateUrl: 'PanelOfVariants.html',
  styleUrls: ['./PanelOfVariants.scss'],
})
export class PanelOfVariants {
  @Input() label: string;
  @Input() variants: string[];
  @Input() selectedVariant: string;
  @Input() position: Position | null = null;
  @Input() onSelect: (variant: string) => void;
  constructor(private hostElement: ElementRef) {
    this.bindAll();
  }
  bindAll() {}
  ngAfterViewInit() {
    if (this.position) {
      if (this.position.top) {
        this.hostElement.nativeElement.style.top = `${this.position.top}px`;
      }
      if (this.position.bottom) {
        this.hostElement.nativeElement.style.bottom = `${this.position.bottom}px`;
      }
      if (this.position.right) {
        this.hostElement.nativeElement.style.right = `${this.position.right}px`;
      }
      if (this.position.left) {
        this.hostElement.nativeElement.style.left = `${this.position.left}px`;
      }
    } else {
      this.hostElement.nativeElement.style.top = '10px';
      this.hostElement.nativeElement.style.left = '10px';
    }
  }
  onClick(variant: string) {
    this.onSelect(variant);
  }
}
