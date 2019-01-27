import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './License.html',
  styleUrls: ['./License.scss']
})
export class License {
  constructor(private hostElement: ElementRef, private router: Router) {}
}
