import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MovableWrapper} from './components/MovableWrapper/MovableWrapper';
import {ResizableWrapper} from './components/ResizableWrapper/ResizableWrapper';
import {DnDWrapper} from './components/DnDWrapper/DnDWrapper';
import {Ghost} from './components/Ghost/Ghost';
// services
import {iWrapperService} from './services/iWrapperService';

@NgModule({
  declarations: [
    MovableWrapper,
    ResizableWrapper,
    DnDWrapper,
    Ghost,
  ],
  imports: [
    BrowserModule
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
