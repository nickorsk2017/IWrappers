import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'resizable-wrapper-example',
  templateUrl: 'ResizableWrapperExample.html',
  styleUrls: ['./ResizableWrapperExample.scss'],
})
export class ResizableWrapperExample {
  typeExample = 'simpleExamples';
  examples = ['simpleExamples', 'frames'];
  constructor() {
    this.bindAll();
  }
  bindAll() {
    this.onExampleSelect = this.onExampleSelect.bind(this);
  }
  onExampleSelect(typeExample: string) {
    this.typeExample = typeExample;
  }
}
