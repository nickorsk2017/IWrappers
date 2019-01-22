import { Component, ElementRef } from '@angular/core';

@Component({
  templateUrl: './Docs.html',
  styleUrls: ['./Docs.scss']
})
export class Docs {
  constructor(private hostElement: ElementRef) {}
  ngAfterViewInit() {
    setTimeout(() => {
      // this.hostElement.nativeElement.style['filter'] = 'none';
    }, 500);
  }
}
