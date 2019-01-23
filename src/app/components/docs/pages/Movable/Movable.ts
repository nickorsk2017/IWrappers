import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './Movable.html',
  styleUrls: ['./Movable.scss']
})
export class Movable {
  apiRows = [
    {
      inputName: 'startPosition',
      description: `Where type of Position: <pre>
      {
        left: <span class="green">number</span>;
        top: <span class="green">number</span>;
      }
      </pre>`,
      inputType: `Position <span class="black">|</span> null`
    },
    {
      inputName: 'protectorElement?',
      description: `Sets parent protector element, default is body.`,
      inputType: `HTMLElement`
    },
  ];
  constructor() {}

}
