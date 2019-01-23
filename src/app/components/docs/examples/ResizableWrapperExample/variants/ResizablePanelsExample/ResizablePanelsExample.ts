import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'resizable-panels-example',
  templateUrl: 'ResizablePanelsExample.html',
  styleUrls: ['./ResizablePanelsExample.scss'],
})
export class ResizablePanelsExample {
  frameSizes: {
    leftPanelWidth: number,
    bottomPanelHeight: number,
  } = {
    leftPanelWidth: 200,
    bottomPanelHeight: 60,
  };
  constructor() {
    this.bindAll();
  }
  bindAll() {
    this.changeSizeLeftPanel = this.changeSizeLeftPanel.bind(this);
    this.changeSizeBottomPanel = this.changeSizeBottomPanel.bind(this);
  }
  changeSizeLeftPanel({width, height}) {
    this.frameSizes.leftPanelWidth = width;
  }
  changeSizeBottomPanel({width, height}) {
    this.frameSizes.bottomPanelHeight = height;
  }
  getTemplateGridOfLeftFrame() {
    return `${this.frameSizes.leftPanelWidth}px auto`;
  }
  getTemplateGridOfRightFrame() {
    return `auto ${this.frameSizes.bottomPanelHeight}px`;
  }
}
