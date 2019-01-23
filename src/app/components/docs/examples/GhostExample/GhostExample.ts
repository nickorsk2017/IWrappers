import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'ghost-example',
  templateUrl: 'GhostExample.html',
  styleUrls: ['./GhostExample.scss'],
})
export class GhostExample {
  constructor() {
    this.bindAll();
  }
  bindAll() {}
}
