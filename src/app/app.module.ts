import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import * as Components from './components';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// reducers and store
import {StoreModule} from '@ngrx/store';
import * as Reducers from './store/reducers';
// services
import * as Services from './services';
import {iWrapperModule} from './components/iWrapper/iWrapperModule';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    Object.keys(Components).map(svc => Components[svc])
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    StoreModule.forRoot({...Reducers}),
    iWrapperModule
  ],
  providers: [Object.keys(Services).map(svc => Services[svc])],
  bootstrap: [Components.App]
})
export class AppModule { }
