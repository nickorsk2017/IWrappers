import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'example-dnd-child',
  templateUrl: 'ExampleDnDChild.html',
  styleUrls: ['./ExampleDnDChild.scss'],
})
export class ExampleDnDChild {
  @Input() data: any;
  @HostBinding('style.background-color') public background = 'transparent';
  constructor() {}
  ngOnInit() {
    this.background = this.data.background;
  }
}
