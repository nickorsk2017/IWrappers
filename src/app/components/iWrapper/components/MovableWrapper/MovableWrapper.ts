import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import {iWrapperService} from '../../services';

@Component({
  selector: 'movable-wrapper',
  templateUrl: 'MovableWrapper.html',
  styleUrls: ['./MovableWrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovableWrapper {
  handlers = [];
  @Input() startPosition: {left: number, top: number} | null = {top: 0, left: 0};
  @Input() protectorElement: HTMLElement = document.body;
  positionBeforeMoved: any = {top: 0, left: 0};
  deltaPositionOfMouse: any = {
    topStart: 0,
    topEnd: 0,
    leftStart: 0,
    leftEnd: 0
  };
  constructor(private iWrapperService: iWrapperService, private hostElement: ElementRef) {
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
    this.iWrapperService.on('mouseup', () => {
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
    this.iWrapperService.on('mousemove', this.onMouseMove);
  }
  unsubscribeToMoveEvent() {
    this.iWrapperService.off(this.onMouseMove);
    this.resetStartPosition();
  }
  onMouseMove(dataHandler) {
    this.moveWrapper(dataHandler.event);
  }
  // ======= Events, subscribes[END]. =======
  /** Get position of Element */
  getPositionElement(element: HTMLElement = this.hostElement.nativeElement) {
    const parentElement = element.parentElement || document.body;
    return {
        top: element.getBoundingClientRect().top - parentElement.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left - parentElement.getBoundingClientRect().left
    };
  }
  /** Reset start position */
  resetStartPosition() {
    this.deltaPositionOfMouse.topEnd = 0;
    this.deltaPositionOfMouse.leftEnd = 0;
  }
  getPositionOfMouse(event: MouseEvent) {
    return {
      top: event.pageY,
      left: event.pageX
    };
  }
  /** Init position of wrapper */
  initPositionWrapper() {
    this.positionBeforeMoved = this.startPosition;
    this.hostElement.nativeElement.style.top = `${this.startPosition.top}px`;
    this.hostElement.nativeElement.style.left = `${this.startPosition.left}px`;
  }
  /** Init delta position */
  initDeltaPosition(event: MouseEvent) {
    this.deltaPositionOfMouse.topStart = event.pageY;
    this.deltaPositionOfMouse.leftStart = event.pageX;
    this.deltaPositionOfMouse.topEnd = event.pageY;
    this.deltaPositionOfMouse.leftEnd = event.pageX;
  }
  /** Update position before wrapper moved */
  updatePositionWrapperBeforeMoved() {
    this.positionBeforeMoved = this.getPositionElement();
  }
  /** Move wrapper */
  moveWrapper(event: MouseEvent) {
    const mousePosition = this.getPositionOfMouse(event);
    // set position wrapper top
    const topPosition = this.positionBeforeMoved.top +
    this.deltaPositionOfMouse.topEnd - this.deltaPositionOfMouse.topStart;
    const leftPosition = this.positionBeforeMoved.left +
    this.deltaPositionOfMouse.leftEnd - this.deltaPositionOfMouse.leftStart;
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
  checkInProtector(type: 'top' | 'left', position: number) {
    if (type === 'top') {
      const protectorTop = this.protectorElement.offsetTop;
      if (protectorTop <= position &&
        (protectorTop + this.protectorElement.offsetHeight) >= (this.hostElement.nativeElement.offsetHeight + position)) {
          return true;
        } else {
          if (protectorTop > position) {
            this.hostElement.nativeElement.style.top = `${0}px`;
          } else {
            this.hostElement.nativeElement.style.top = `${protectorTop + this.protectorElement.offsetHeight -
              this.hostElement.nativeElement.offsetHeight}px`;
          }
        }
    } else {
      const protectorLeft = this.protectorElement.offsetLeft;
      if (protectorLeft <= position &&
        (protectorLeft + this.protectorElement.offsetWidth) >= (this.hostElement.nativeElement.offsetWidth + position)) {
          return true;
      } else {
        if (protectorLeft > position) {
          this.hostElement.nativeElement.style.left = `${0}px`;
        } else {
          this.hostElement.nativeElement.style.left = `${protectorLeft + this.protectorElement.offsetWidth -
            this.hostElement.nativeElement.offsetWidth}px`;
        }
      }
    }
    return false;
  }
}
