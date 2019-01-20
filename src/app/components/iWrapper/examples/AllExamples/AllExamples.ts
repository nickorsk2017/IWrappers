import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import {} from '../../services';

@Component({
  selector: 'all-example',
  templateUrl: 'AllExamples.html',
  styleUrls: ['./AllExamples.scss'],
})
export class AllExamples {
  typeExample = 'DragAndDrop';
  examples = ['Movable', 'Resizable', 'DragAndDrop'];
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
