import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MovableWrapper,
  PanelOfVariants,
  ResizableWrapper,
  DnDWrapper,
  Ghost,
  GhostExample
} from './components';
import {
  MovableWithProtectorExample,
  MovableWithoutProtectorExample,
  MovableWrapperExample,
  ResizableWrapperExample,
  ResizableExamples,
  ResizablePanelsExample,
  AllExamples,
  DragAndDropWrapperExample,
  ExampleDnDChild,
  DnDBaseExample
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
    AllExamples,
    DragAndDropWrapperExample,
    DnDWrapper,
    Ghost,
    GhostExample,
    ExampleDnDChild,
    DnDBaseExample
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    MovableWrapper,
    ResizableWrapper,
    AllExamples,
    DnDWrapper
  ],
  entryComponents: [Ghost, GhostExample, ExampleDnDChild],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( wrapperService: iWrapperService ) {
    wrapperService.createGhostComponent(Ghost);
  }
}
