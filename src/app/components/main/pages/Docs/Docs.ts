import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  templateUrl: './Docs.html',
  styleUrls: ['./Docs.scss']
})
export class Docs {
  @ViewChild('docsRight') docsRight: ElementRef;
  constructor() {}
  onActivate(e) {
    if (this.docsRight) {
      this.docsRight.nativeElement.scrollTop = 0;
    }
  }
}
