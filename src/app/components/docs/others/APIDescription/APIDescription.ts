import { Component, Input } from '@angular/core';

interface Row {
  inputName: string;
  inputType: string;
  description: string;
}

@Component({
  selector: 'api-description',
  templateUrl: './APIDescription.html',
  styleUrls: ['./APIDescription.scss']
})
export class APIDescription {
  @Input() rows: Row[];
  constructor() {}
}
