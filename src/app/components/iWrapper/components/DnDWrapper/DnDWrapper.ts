import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import { iWrapperService } from '../../services';

@Component({
  selector: 'dnd-wrapper',
  templateUrl: 'DnDWrapper.html',
  styleUrls: ['./DnDWrapper.scss'],
})
export class DnDWrapper {
  isEnter: Boolean = false;
  @Input() type: 'drag' | 'drop' | 'files';
  @Input() ghostComponent: any;
  @Input() ghostComponentInputs: any = null;
  @Input() data: any;
  @Input() typeRecipient: string;
  @Input() typesSenders: string[] = [];
  @Input() onDrop: (data: any) => void = () => {};
  constructor(private wrapperService: iWrapperService, private hostElement: ElementRef) {
    this.bindAll();
  }
  bindAll() {}
  ngAfterViewInit() {
    this.subscribeEvents();
    this.initUploadFiles();
  }
  initUploadFiles() {
    if (this.canUploadFiles()) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        this.hostElement.nativeElement.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
    }
  }
  // ======= Events, subscribes. =======
  subscribeEvents() {
    this.wrapperService.on('mouseup', (dataHandler: any) => {
      if (this.isEnter && this.canReceiveData()) {
        const dataForReceiver = this.wrapperService.getDataForReceiver();
        this.onDrop(dataForReceiver.data);
      } else if (this.type === 'files') {

      }
      this.removeStyle();
    });
  }
  canUploadFiles() {
    return this.type === 'files';
  }
  canReceiveData() {
    const dataForReceiver = this.wrapperService.getDataForReceiver();
    return (
      this.type === 'drop' &&
      Array.isArray(this.typesSenders) &&
      dataForReceiver.typeRecipient &&
      dataForReceiver.data &&
      this.typesSenders.includes(dataForReceiver.typeRecipient)
    );
  }
  addDashedBorder() {
    this.hostElement.nativeElement.style.border = '2px dashed #333';
  }
  removeDashedBorder() {
    this.hostElement.nativeElement.style.border = '';
  }
  @HostListener('dragenter', ['$event'])
  onDropEnter(event) {
    if (this.canUploadFiles()) {
      this.addDashedBorder();
    }
  }
  @HostListener('dragleave', ['$event'])
  onDropLeave(event) {
    if (this.canUploadFiles()) {
      this.removeDashedBorder();
    }
  }
  @HostListener('drop', ['$event'])
  onDropFiles(event) {
    if (this.canUploadFiles()) {
      const dt = event.dataTransfer;
      const files = dt.files;
      this.onDrop(files);
      this.removeDashedBorder();
    }
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.ghostComponent && this.data && this.type === 'drag') {
      this.wrapperService.setGhost({
        component: this.ghostComponent,
        componentInputs: this.ghostComponentInputs,
        data: this.data,
        typeRecipient: this.typeRecipient
      });
    }
  }
  @HostListener('mouseenter', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.canReceiveData()) {
      this.isEnter = true;
      this.styleWhenHover();
    }
  }
  @HostListener('mouseleave', ['$event'])
  onMouseOuter(event: MouseEvent) {
    this.isEnter = false;
    this.removeStyle();
  }
  // ======= Events, subscribes[END]. =======
  styleWhenHover() {
    this.hostElement.nativeElement.style.opacity = '0.6';
  }
  removeStyle() {
    this.hostElement.nativeElement.style.opacity = '1';
  }
}
