import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'movable-with-protector-example',
  templateUrl: 'MovableWithProtectorExample.html',
  styleUrls: ['./MovableWithProtectorExample.scss'],
})
export class MovableWithProtectorExample {
  @ViewChild('protectorRef') protectorRef: ElementRef;
  constructor() {
    this.bindAll();
  }
  bindAll() {}
  ngAfterViewInit() {}
}
