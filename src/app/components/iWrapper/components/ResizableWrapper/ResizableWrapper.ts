import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import {iWrapperService} from '../../services';

type Direction = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

@Component({
  selector: 'resizable-wrapper',
  templateUrl: 'ResizableWrapper.html',
  styleUrls: ['./ResizableWrapper.scss'],
})
export class ResizableWrapper {
  @Input() size: {
    initWidth: number,
    initHeight: number,
    minHeight: number,
    minWidth: number,
    maxHeight: number,
    maxWidth: number
  };
  @Input() visibleResizePoints: Boolean = false;
  @Input() float: 'right' | 'left' | null = null;
  sizeBeforeResized: {height: number, width: number} = {height: 0, width: 0};
  deltaPositionOfMouse: any = {
    topStart: 0,
    topEnd: 0,
    leftStart: 0,
    leftEnd: 0
  };
  direction: Direction | null;
  constructor(private wrapperService: iWrapperService, private hostElement: ElementRef) {
    this.bindAll();
  }
  bindAll() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.resize = this.resize.bind(this);
  }
  ngAfterViewInit() {
    const hostElement = this.hostElement.nativeElement;
    hostElement.style.width = `${this.size.initWidth}px`;
    hostElement.style.height = `${this.size.initHeight}px`;
    if (this.float) {
      hostElement.style.float = this.float;
    }
    this.subscribeEvents();
  }
  subscribeEvents() {
    this.wrapperService.on('mouseup', () => {
      this.wrapperService.off(this.onMouseMove);
      this.wrapperService.resetCursor();
    });
  }
   /** Init delta position */
   initDeltaPosition(event: MouseEvent) {
    this.deltaPositionOfMouse.topStart = event.pageY;
    this.deltaPositionOfMouse.leftStart = event.pageX;
    this.deltaPositionOfMouse.topEnd = this.deltaPositionOfMouse.topStart;
    this.deltaPositionOfMouse.leftEnd = this.deltaPositionOfMouse.leftStart;
  }
  initSize() {
    this.sizeBeforeResized.width = this.hostElement.nativeElement.offsetWidth;
    this.sizeBeforeResized.height = this.hostElement.nativeElement.offsetHeight;
  }
  resize(event: MouseEvent, direction: Direction) {
    this.direction = direction;
    this.initDeltaPosition(event);
    this.initSize();
    this.setCursor();
    this.wrapperService.on('mousemove', this.onMouseMove);
  }
  setCursor() {
    switch (this.direction) {
      case 'top':
      this.wrapperService.setCursor('row-resize');
      break;
      case 'top-left':
      this.wrapperService.setCursor('nwse-resize');
      break;
      case 'top-right':
      this.wrapperService.setCursor('nesw-resize');
      break;
      case 'bottom':
      this.wrapperService.setCursor('row-resize');
      break;
      case 'bottom-left':
      this.wrapperService.setCursor('nesw-resize');
      break;
      case 'bottom-right':
      this.wrapperService.setCursor('nwse-resize');
      break;
      case 'left':
      this.wrapperService.setCursor('col-resize');
      break;
      case 'right':
      this.wrapperService.setCursor('col-resize');
      break;
    }
  }
  onMouseMove(dataHandler: any) {
    const mousePosition = this.wrapperService.getPositionOfMouse(dataHandler.event);
    const positionWrapper = this.wrapperService.getPositionElement(this.hostElement.nativeElement, this.hostElement.nativeElement.parentElement);
    let newHeight: Number = 0;
    let newWidth: Number = 0;
    switch (this.direction) {
      case 'top':
      case 'top-left':
      case 'top-right':
        newHeight = this.sizeBeforeResized.height - (this.deltaPositionOfMouse.topEnd - this.deltaPositionOfMouse.topStart);
        break;
      case 'bottom':
      case 'bottom-left':
      case 'bottom-right':
        newHeight = this.sizeBeforeResized.height + (this.deltaPositionOfMouse.topEnd - this.deltaPositionOfMouse.topStart);
      break;
    }
    switch (this.direction) {
      case 'left':
      case 'bottom-left':
      case 'top-left':
        newWidth = this.sizeBeforeResized.width - (this.deltaPositionOfMouse.leftEnd - this.deltaPositionOfMouse.leftStart);
      break;
      case 'right':
      case 'bottom-right':
      case 'top-right':
        newWidth = this.sizeBeforeResized.width + (this.deltaPositionOfMouse.leftEnd - this.deltaPositionOfMouse.leftStart);
      break;
    }
    if (newHeight) {
      if (newHeight > this.size.maxHeight) {
        newHeight = this.size.maxHeight;
      }
      if (newHeight < this.size.minHeight) {
        newHeight = this.size.minHeight;
      }
      this.hostElement.nativeElement.style.height = `${newHeight}px`;
    }
    if (newWidth) {
      if (newWidth > this.size.maxWidth) {
        newWidth = this.size.maxWidth;
      }
      if (newWidth < this.size.minWidth) {
        newWidth = this.size.minWidth;
      }
      this.hostElement.nativeElement.style.width = `${newWidth}px`;
    }
    // update delta position
    this.deltaPositionOfMouse.topEnd = mousePosition.top;
    this.deltaPositionOfMouse.leftEnd = mousePosition.left;
  }
}
