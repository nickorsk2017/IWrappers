import {Injectable} from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Injectable()
export class iWrapperService {
  handlers = [];
  constructor() {
    this.bindAll();
    this.subscribeEvents();
  }
  bindAll() {
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseup = this.onMouseup.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
  }
  subscribeEvents() {
    window.addEventListener('mousedown', this.onMousedown);
    window.addEventListener('mouseup', this.onMouseup);
    window.addEventListener('mousemove', this.onMousemove);
  }
  onMousedown(event: MouseEvent) {
    this.fire({typeHandler: 'mousedown', event});
  }
  onMousemove(event: MouseEvent) {
    this.fire({typeHandler: 'mousemove', event});
  }
  onMouseup(event: MouseEvent) {
    this.fire({typeHandler: 'mouseup', event});
  }
  /** Subscribe to coordinate events */
  on(typeHandler: 'mousemove' | 'click' | 'mousedown' | 'mouseup', handler: (event: MouseEvent) => void) {
    this.handlers.push({handler, typeHandler});
  }
  /** Unsubscribe to coordinate events */
  off(handler: (event: MouseEvent) => void) {
    this.handlers = this.handlers.filter(
        (handlerItem) => handlerItem.handler !== handler
    );
  }
  /** Fire event to handlers */
  fire(parameters: {typeHandler: 'mousemove' | 'click' | 'mousedown' | 'mouseup', data?: any | null, event: MouseEvent}) {
      this.handlers.forEach((handlerItem) => {
        if (parameters.typeHandler === handlerItem.typeHandler) {
          handlerItem.handler.call(handlerItem.handler, {data: parameters.data || null, event});
        }
      });
  }
  /** Get position of Element */
  getPositionElement(element: HTMLElement, parentElement: HTMLElement) {
    return {
        top: element.getBoundingClientRect().top - parentElement.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left - parentElement.getBoundingClientRect().left
    };
  }
  /** Get position of mouse */
  getPositionOfMouse(event: MouseEvent) {
    return {
      top: event.pageY,
      left: event.pageX
    };
  }
  enableSelection() {
    document.body.style.userSelect = 'all';
  }
  disableSelection() {
    document.body.style.userSelect = 'none';
  }
  setCursor(cursorName: 'row-resize' | 'col-resize' | 'nwse-resize' | 'nesw-resize') {
    document.body.style.cursor = cursorName;
  }
  resetCursor() {
    document.body.style.cursor = 'initial';
  }
}
