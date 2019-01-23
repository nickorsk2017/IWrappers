import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'all-example',
  templateUrl: 'AllExamples.html',
  styleUrls: ['./AllExamples.scss'],
})
export class AllExamples {
  typeExample = 'DragAndDrop';
  examples = ['DragAndDrop', 'Movable', 'Resizable'];
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
