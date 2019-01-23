import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './DnD.html',
  styleUrls: ['./DnD.scss']
})
export class DnD {
  /*
  @Input() type: 'drag' | 'drop' | 'files';
  @Input() ghostComponent: any;
  @Input() ghostComponentInputs: any = null;
  @Input() data: any;
  @Input() typeRecipient: string;
  @Input() typesSenders: string[] = [];
  @Input() onDrop: (data: any) => void = () => {};
  */
  apiRows = [
    {
      inputName: 'type?',
      description: `Sets type of wrapper. Sets drag, drop or files (for drag and drop files from desktop). `,
      inputType: `'drag' <span class="black">|</span> 'drop' <span class="black">|</span> 'files'`
    },
    {
      inputName: 'ghostComponent',
      description: `Sets ghost after drag start.`,
      inputType: `<span class="black">Angular component class.</span>`
    },
    {
      inputName: 'ghostComponentInputs',
      description: `Properties (@Inputs) for a ghost component.`,
      inputType: `JSON<span class="black">, where key is name of @Input, value is @Input of value.</span>`
    },
    {
      inputName: 'data',
      description: `Sets data for send to receiver.`,
      inputType: `any`
    },
    {
      inputName: 'typeRecipient',
      description: `Type recipient, need set only for dragged components.`,
      inputType: `string`
    },
    {
      inputName: 'typesSenders',
      description: `Types of senders, which data can be obtained in a component for drop.`,
      inputType: `string[]`
    },
    {
      inputName: 'onDrop',
      description: `Callback function. Return data to component for drop or receive files.`,
      inputType: `(data: any) => void`
    },
  ];
  constructor() {}

}
