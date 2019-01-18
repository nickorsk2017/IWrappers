import { Component, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';

@Component({
  selector: 'coordinates-wrapper',
  template: '',
  styleUrls: ['./CoordinatesWrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatesWrapper {
  handlers = [];
  constructor() {
    this.bindAll();
  }
  bindAll() {}
  @HostListener('window:mousedown', ['$event'])
  onMouseDown(ev: KeyboardEvent) {
    this.fire('mouseDown');
  }
  /** Subscribe to coordinate events */
  on(typeHandler: 'mouseMove' | 'mouseClick' | 'mouseDown' | 'mouseUp', handler: void) {
    this.handlers.push({handler, typeHandler});
  }
  /** Unsubscribe to coordinate events */
  off(handler: void) {
    this.handlers = this.handlers.filter(
        function(item) {
            if (item !== handler) {
                return item;
            }
        }
    );
  }
  /** Fire event to handlers */
  fire(typeHandler: 'mouseMove' | 'mouseClick' | 'mouseDown' | 'mouseUp', data: any | null = null) {
      this.handlers.forEach((handlerItem) => {
        if (typeHandler === handlerItem.typeHandler){
          handlerItem.handler.call(window, data);
        }
      });
  }
}
