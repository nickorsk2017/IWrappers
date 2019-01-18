import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MovableWrapper, PanelOfVariants} from './components';
import {MovableWithProtectorExample, MovableWithoutProtectorExample, MovableWrapperExample} from './examples';
// services
import {iWrapperService} from './services';

@NgModule({
  declarations: [MovableWrapper, MovableWithProtectorExample, MovableWithoutProtectorExample, MovableWrapperExample, PanelOfVariants],
  imports: [
    BrowserModule,
  ],
  exports: [MovableWrapper, MovableWrapperExample],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( wrapperService: iWrapperService ) {}
}
