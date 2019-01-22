import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './Resizable.html',
  styleUrls: ['./Resizable.scss']
})
export class Resizable {
  constructor(private hostElement: ElementRef, private router: Router) {}

}
