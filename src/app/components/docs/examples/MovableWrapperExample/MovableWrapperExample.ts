import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'movable-wrapper-example',
  templateUrl: 'MovableWrapperExample.html',
  styleUrls: ['./MovableWrapperExample.scss'],
})
export class MovableWrapperExample {
  typeExample = 'withoutProtector';
  examples = ['withoutProtector', 'withProtector'];
  constructor() {
    this.bindAll();
  }
  bindAll() {
    this.onExampleSelect = this.onExampleSelect.bind(this);
  }
  ngAfterViewInit() {}
  onExampleSelect(typeExample: string) {
    this.typeExample = typeExample;
  }
}
