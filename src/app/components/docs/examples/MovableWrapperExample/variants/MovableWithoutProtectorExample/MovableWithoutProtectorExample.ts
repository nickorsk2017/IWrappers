import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'movable-without-protector-example',
  templateUrl: 'MovableWithoutProtectorExample.html',
  styleUrls: ['./MovableWithoutProtectorExample.scss'],
})
export class MovableWithoutProtectorExample {
  constructor() {
    this.bindAll();
  }
  bindAll() {}
  ngAfterViewInit() {}
}
