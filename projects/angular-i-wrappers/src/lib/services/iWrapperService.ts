import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef
} from '@angular/core';
import {GhostEntity} from '../components/Ghost/classes/GhostEntity';

interface GhostData {
  component: any;
  componentInputs: any;
  data: any;
  typeRecipient: string;
}

@Injectable()
export class iWrapperService {
  handlers = [];
  ghost: GhostEntity;
  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    public appRef: ApplicationRef,
    public injector: Injector) {
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
    if (this.ghost) {
      this.ghost.updatePosition({
        top: event.pageY,
        left: event.pageX
      });
    }
    this.fire({typeHandler: 'mousemove', event});
  }
  onMouseup(event: MouseEvent) {
    this.fire({
      typeHandler: 'mouseup',
      event
    });
    this.unsetGhost();
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
          const response: any = {
            event: parameters.event
          };
          if (parameters.data) {
            response.data = parameters.data;
          }
          handlerItem.handler.call(handlerItem.handler, response);
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
    document.body.style.userSelect = 'auto';
    document.body.style.webkitUserSelect = 'auto';
  }
  disableSelection() {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  }
  setCursor(cursorName: 'row-resize' | 'col-resize' | 'nwse-resize' | 'nesw-resize') {
    document.body.style.cursor = cursorName;
  }
  resetCursor() {
    document.body.style.cursor = 'initial';
  }
  /** Create ghost component */
  createGhostComponent(ghostComponent: any) {
    this.ghost = new GhostEntity(ghostComponent, this.componentFactoryResolver, this.appRef, this.injector);
  }
  /** Set ghost for Drag and Drop with data */
  setGhost(ghostData: GhostData) {
    this.disableSelection();
    this.ghost.createChildGhostComponent(ghostData);
  }
  /** Destroy child component of ghost */
  unsetGhost() {
    this.enableSelection();
    this.ghost.destroyChildGhostComponent();
  }
  /** Get DnD data */
  getDataForReceiver() {
    return this.ghost.getDataForReceiver();
  }
}
