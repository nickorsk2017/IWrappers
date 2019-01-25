import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'ghost',
  templateUrl: 'Ghost.html',
  styleUrls: ['./Ghost.css'],
})
export class Ghost {
  constructor() {
    this.bindAll();
  }
  bindAll() {}
}
