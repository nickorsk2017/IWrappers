import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MovableWrapper, CoordinatesWrapper} from './components';
// services
import {iWrapperService} from './services';

@NgModule({
  declarations: [MovableWrapper, CoordinatesWrapper],
  imports: [
    BrowserModule,
  ],
  exports: [MovableWrapper, CoordinatesWrapper],
  providers: [iWrapperService]
})
export class iWrapperModule {
  constructor( iWrapperService: iWrapperService ) {

  }
}
