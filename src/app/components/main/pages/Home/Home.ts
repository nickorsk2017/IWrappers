import { Component, ElementRef } from '@angular/core';

@Component({
  templateUrl: './Home.html',
  styleUrls: ['./Home.scss']
})
export class Home {
  constructor(private hostElement: ElementRef) {}
  ngAfterViewInit() {
    setTimeout(() => {
      // this.hostElement.nativeElement.style['filter'] = 'none';
    }, 500);
  }
}
