import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MovableWrapper,
  ResizableWrapper,
  DnDWrapper,
  Ghost
} from './components';
// services
import {iWrapperService} from './services';

@NgModule({
  declarations: [
    MovableWrapper,
    ResizableWrapper,
    DnDWrapper,
    Ghost,
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    MovableWrapper,
    ResizableWrapper,
    DnDWrapper
  ],
  entryComponents: [Ghost],
  providers: [iWrapperService]
})
export class iWrappersModule {
  constructor( wrapperService: iWrapperService ) {
    wrapperService.createGhostComponent(Ghost);
  }
}
