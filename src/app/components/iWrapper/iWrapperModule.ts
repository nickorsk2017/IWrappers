import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MovableWrapper,
  PanelOfVariants,
  ResizableWrapper
} from './components';
import {
  MovableWithProtectorExample,
  MovableWithoutProtectorExample,
  MovableWrapperExample,
  ResizableWrapperExample,
  ResizableExamples,
  ResizablePanelsExample
} from './examples';
// services
import {iWrapperService} from './services';

@NgModule({
  declarations: [
    MovableWrapper,
    MovableWithProtectorExample,
    MovableWithoutProtectorExample,
    MovableWrapperExample,
    PanelOfVariants,
    ResizableWrapper,
    ResizableWrapperExample,
    ResizableExamples,
    ResizablePanelsExample
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    MovableWrapper,
    MovableWrapperExample,
    ResizableWrapper,
    ResizableWrapperExample,
    ResizableExamples,
    ResizablePanelsExample
  ],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( wrapperService: iWrapperService ) {}
}
