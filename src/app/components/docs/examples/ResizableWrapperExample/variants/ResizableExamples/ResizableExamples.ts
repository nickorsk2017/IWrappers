import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'resizable-examples',
  templateUrl: 'ResizableExamples.html',
  styleUrls: ['./ResizableExamples.scss'],
})
export class ResizableExamples {
  constructor() {
    this.bindAll();
  }
  bindAll() {}
}
