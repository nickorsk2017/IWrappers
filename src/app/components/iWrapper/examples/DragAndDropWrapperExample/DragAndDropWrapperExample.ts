import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'dnd-wrapper-example',
  templateUrl: 'DragAndDropWrapperExample.html',
  styleUrls: ['./DragAndDropWrapperExample.scss'],
})
export class DragAndDropWrapperExample {
  typeExample = 'simpleExamples';
  examples = ['simpleExamples'];
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
