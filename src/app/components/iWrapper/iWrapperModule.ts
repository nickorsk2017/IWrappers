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
  ResizablePanelsExample,
  AllExamples
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
    ResizablePanelsExample,
    AllExamples
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
    ResizablePanelsExample,
    AllExamples
  ],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( wrapperService: iWrapperService ) {}
}
