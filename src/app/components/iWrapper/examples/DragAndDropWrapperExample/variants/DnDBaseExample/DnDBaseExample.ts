import { ViewChild, Input, Component, HostListener, ElementRef } from '@angular/core';
import {ExampleDnDChild} from '../../components/ExampleDnDChild/ExampleDnDChild';

@Component({
  selector: 'dnd-base-example',
  templateUrl: 'DnDBaseExample.html',
  styleUrls: ['./DnDBaseExample.scss'],
})
export class DnDBaseExample {
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadedFiles: any[] = [];
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
    this.onDropLeft = this.onDropLeft.bind(this);
    this.onDropRight = this.onDropRight.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
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
  onDropFiles(files: FileList) {
    this.uploadedFiles = this.uploadedFiles.concat(Array.from(files));
  }
  onSelectFilesFromComputer(event) {
    const files = Array.from(event.srcElement.files);
    this.uploadedFiles = this.uploadedFiles.concat(files);
  }
  uploadFromComputer() {
    this.fileInput.nativeElement.click();
  }
}
