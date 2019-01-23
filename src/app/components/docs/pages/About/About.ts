import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './About.html',
  styleUrls: ['./About.scss']
})
export class About {
  constructor(private hostElement: ElementRef, private router: Router) {}
}
