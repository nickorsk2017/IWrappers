import { Input, Component, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import {ExampleDnDChild} from '../DragAndDropWrapperExample/components/ExampleDnDChild/ExampleDnDChild';

@Component({
  selector: 'dnd-wrapper-example',
  templateUrl: 'DragAndDropWrapperExample.html',
  styleUrls: ['./DragAndDropWrapperExample.scss'],
})
export class DragAndDropWrapperExample {
  typeExample = 'baseExample';
  examples = ['baseExample'];
  leftBlockItems: any[] = [
    {id: 1, background: 'red'},
    {id: 2, background: 'red'},
    {id: 3, background: 'red'}
  ];
  rightBlockItems: any[] = [
    {id: 4, background: 'green'},
    {id: 5, background: 'green'},
    {id: 6, background: 'green'}
  ];
  constructor() {
    this.bindAll();
  }
  bindAll() {
    this.onExampleSelect = this.onExampleSelect.bind(this);
    this.onDropLeft = this.onDropLeft.bind(this);
    this.onDropRight = this.onDropRight.bind(this);
  }
  onExampleSelect(typeExample: string) {
    this.typeExample = typeExample;
  }
  getGhostComponent() {
    return ExampleDnDChild;
  }
  getGhostComponentInputs(item: any) {
    return {data: item};
  }
  onDropLeft(item: any) {
    this.rightBlockItems = this.rightBlockItems.filter((_item) => {
      return item.id !== _item.id;
    });
    this.leftBlockItems.push(item);
    console.log(item, 'data');
  }
  onDropRight(item: any) {
    this.leftBlockItems = this.leftBlockItems.filter((_item) => {
      return item.id !== _item.id;
    });
    this.rightBlockItems.push(item);
  }
}
