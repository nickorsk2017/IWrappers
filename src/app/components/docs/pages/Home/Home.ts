import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './Home.html',
  styleUrls: ['./Home.scss']
})
export class Home {
  constructor(private hostElement: ElementRef, private router: Router) {}
  goDocs() {
    document.getElementById('logo-container').className += ' logo-container-hide';
    setTimeout(() => {
      this.router.navigate(['/docs']);
    }, 200);
  }
}
