import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {
  App
} from './components/docs/App/App';
import {
  Home,
  Demo,
  Docs,
  Resizable,
  Movable,
  DnD,
  About,
} from './components/docs/pages';
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
  DnDBaseExample,
  GhostExample
} from './components/docs/examples';
import {
  APIDescription,
  PanelOfVariants
} from './components/docs/others';
import { HttpClientModule } from '@angular/common/http';
import {iWrappersModule} from './components/iWrappers/iWrappersModule';

@NgModule({
  declarations: [
    App,
    Home,
    Demo,
    Docs,
    Resizable,
    Movable,
    DnD,
    About,
    APIDescription,
    PanelOfVariants,
    MovableWithProtectorExample,
    MovableWithoutProtectorExample,
    MovableWrapperExample,
    ResizableWrapperExample,
    ResizableExamples,
    ResizablePanelsExample,
    AllExamples,
    DragAndDropWrapperExample,
    ExampleDnDChild,
    DnDBaseExample,
    GhostExample
  ],
  entryComponents: [
    GhostExample,
    ExampleDnDChild
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    iWrappersModule
  ],
  bootstrap: [App]
})
export class AppModule { }
