import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MovableWrapper, PanelOfVariants, ResizableWrapper} from './components';
import {MovableWithProtectorExample, MovableWithoutProtectorExample, MovableWrapperExample} from './examples';
// services
import {iWrapperService} from './services';

@NgModule({
  declarations: [MovableWrapper, MovableWithProtectorExample, MovableWithoutProtectorExample, MovableWrapperExample, PanelOfVariants, ResizableWrapper],
  imports: [
    BrowserModule,
  ],
  exports: [MovableWrapper, MovableWrapperExample, ResizableWrapper],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( wrapperService: iWrapperService ) {}
}
