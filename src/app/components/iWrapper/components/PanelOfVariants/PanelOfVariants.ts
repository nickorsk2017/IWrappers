import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'panel-of-variants',
  templateUrl: 'PanelOfVariants.html',
  styleUrls: ['./PanelOfVariants.scss'],
})
export class PanelOfVariants {
  @Input() variants: string[];
  @Input() selectedVariant: string;
  @Input() onSelect: (variant: string) => void;
  constructor() {
    this.bindAll();
  }
  bindAll() {}
  ngAfterViewInit() {}
  onClick(variant: string) {
    this.onSelect(variant);
  }
}
