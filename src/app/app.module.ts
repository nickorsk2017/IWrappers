import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {App, Home, Demo} from './components';
import { HttpClientModule } from '@angular/common/http';
import {iWrapperModule} from './components/iWrapper/iWrapperModule';

@NgModule({
  declarations: [App, Home, Demo],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    iWrapperModule
  ],
  bootstrap: [App]
})
export class AppModule { }
