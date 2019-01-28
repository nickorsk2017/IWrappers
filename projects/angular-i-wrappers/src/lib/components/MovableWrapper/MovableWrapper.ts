import { Input, Component, HostListener, ElementRef } from '@angular/core';
import { iWrapperService } from '../../services/iWrapperService';

interface Position {
  left: number;
  top: number;
}

@Component({
  selector: 'movable-wrapper',
  templateUrl: 'MovableWrapper.html',
  styleUrls: ['./MovableWrapper.css']
})
export class MovableWrapper {
  handlers = [];
  @Input() startPosition: Position | null = {top: 0, left: 0};
  @Input() protectorElement?: HTMLElement = document.body;
  positionBeforeMoved: any = {top: 0, left: 0};
  deltaPositionOfMouse: any = {
    topStart: 0,
    topEnd: 0,
    leftStart: 0,
    leftEnd: 0
  };
  constructor(private wrapperService: iWrapperService, private hostElement: ElementRef) {
    this.bindAll();
  }
  bindAll() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  ngAfterViewInit() {
    this.subscribeEvents();
    this.initPositionWrapper();
  }
  // ======= Events, subscribes. =======
  subscribeEvents() {
    this.wrapperService.on('mouseup', () => {
      this.unsubscribeToMoveEvent();
    });
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.initDeltaPosition(event);
    this.updatePositionWrapperBeforeMoved();
    this.subscribeToMoveEvent();
  }
  subscribeToMoveEvent() {
    this.wrapperService.on('mousemove', this.onMouseMove);
  }
  unsubscribeToMoveEvent() {
    this.wrapperService.off(this.onMouseMove);
    this.wrapperService.enableSelection();
    this.resetStartPosition();
  }
  onMouseMove(dataHandler) {
    this.wrapperService.disableSelection();
    this.moveWrapper(dataHandler.event);
  }
  // ======= Events, subscribes[END]. =======
  /** Reset start position */
  resetStartPosition() {
    this.deltaPositionOfMouse.topEnd = 0;
    this.deltaPositionOfMouse.leftEnd = 0;
  }
  getStyle(element: HTMLElement, style: string) {
    const styles = window.getComputedStyle(element);
    return styles.getPropertyValue(style);
  }
  /** Init position of wrapper */
  initPositionWrapper() {
    this.positionBeforeMoved = this.startPosition;
    this.hostElement.nativeElement.style.top = `${this.startPosition.top}px`;
    this.hostElement.nativeElement.style.left = `${this.startPosition.left}px`;
    if (!this.checkIsBody(this.protectorElement)) {
      const position = this.getStyle(this.protectorElement, 'position');
      if (position !== 'absolute' && position !== 'relative') {
        this.protectorElement.style.position = 'relative';
      }
    }
  }
  /** Init delta position */
  initDeltaPosition(event: MouseEvent) {
    this.deltaPositionOfMouse.topStart = event.pageY;
    this.deltaPositionOfMouse.leftStart = event.pageX;
    this.deltaPositionOfMouse.topEnd = this.deltaPositionOfMouse.topStart;
    this.deltaPositionOfMouse.leftEnd = this.deltaPositionOfMouse.leftStart;
  }
  /** Update position before wrapper moved */
  updatePositionWrapperBeforeMoved() {
    const parentElement = this.hostElement.nativeElement.parentElement || document.body;
    this.positionBeforeMoved = this.wrapperService.getPositionElement(this.hostElement.nativeElement, this.protectorElement);
  }
  /** Move wrapper */
  moveWrapper(event: MouseEvent) {
    const mousePosition = this.wrapperService.getPositionOfMouse(event);
    // set position wrapper top
    const topPosition = this.positionBeforeMoved.top + this.deltaPositionOfMouse.topEnd - this.deltaPositionOfMouse.topStart;
    const leftPosition = this.positionBeforeMoved.left + this.deltaPositionOfMouse.leftEnd - this.deltaPositionOfMouse.leftStart;
    if (this.checkInProtector('top', topPosition)) {
      this.hostElement.nativeElement.style.top = `${topPosition}px`;
    }
    if (this.checkInProtector('left', leftPosition)) {
      // set position wrapper left
      this.hostElement.nativeElement.style.left = `${leftPosition}px`;
    }
    // update delta position
    this.deltaPositionOfMouse.topEnd = mousePosition.top;
    this.deltaPositionOfMouse.leftEnd = mousePosition.left;
  }
  checkIsBody(element) {
    return document.body === element;
  }
  getBordersWidth(element: HTMLElement) {
    const borderLeft: number = Math.ceil(Number(this.getStyle(element, 'border-left-width').replace('px', '')));
    const borderRight: number = Math.ceil(Number(this.getStyle(element, 'border-right-width').replace('px', '')));
    const borderTop: number = Math.ceil(Number(this.getStyle(element, 'border-top-width').replace('px', '')));
    const borderBottom: number = Math.ceil(Number(this.getStyle(element, 'border-bottom-width').replace('px', '')));
    return {
      borderLeft,
      borderRight,
      borderTop,
      borderBottom
    };
  }
  checkInProtector(type: 'top' | 'left', position: number) {
    if (type === 'top') {
      let protectorTop = this.protectorElement.offsetTop;
      if (!this.checkIsBody(this.protectorElement)) {
        protectorTop = 0;
      }
      if (protectorTop <= position &&
        (protectorTop + this.protectorElement.offsetHeight) >= (this.hostElement.nativeElement.offsetHeight + position)) {
          return true;
        } else {
          if (protectorTop > position) {
            this.hostElement.nativeElement.style.top = `${0}px`;
          } else {
            const borderWidth = this.getBordersWidth(this.protectorElement);
            this.hostElement.nativeElement.style.top = `${protectorTop + this.protectorElement.offsetHeight -
              this.hostElement.nativeElement.offsetHeight - borderWidth.borderTop - borderWidth.borderBottom}px`;
          }
        }
    } else {
      let protectorLeft = this.protectorElement.offsetLeft;
      if (!this.checkIsBody(this.protectorElement)) {
        protectorLeft = 0;
      }
      if (protectorLeft <= position &&
        (protectorLeft + this.protectorElement.offsetWidth) >= (this.hostElement.nativeElement.offsetWidth + position)) {
          return true;
      } else {
        if (protectorLeft > position) {
          this.hostElement.nativeElement.style.left = `${0}px`;
        } else {
          const borderWidth = this.getBordersWidth(this.protectorElement);
          this.hostElement.nativeElement.style.left = `${protectorLeft + this.protectorElement.offsetWidth -
            this.hostElement.nativeElement.offsetWidth - borderWidth.borderLeft - borderWidth.borderRight}px`;
        }
      }
    }
    return false;
  }
}
