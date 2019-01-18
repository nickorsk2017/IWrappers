import {Injectable} from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import {Store, Action} from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable()
export class API {
  constructor (private http: HttpClient, private store: Store<any>) {}
  /** for merge default and custom headers put params to options like:
   *  { headers: {
   *      headerName1: "headerValue1",
   *      headerName2: "headerValue2"
   *      ...
   *    },
   *
   *   //other options
   *    ...
   *  }
   * */
  getHeaders(customHeaders: Object) {
    const headers = new HttpHeaders();
    for (const c in customHeaders) {
      if (customHeaders.hasOwnProperty(c)) {
        headers.append(c, customHeaders[c]);
      }
    }
    return headers;
  }
  /** REST API GET request method */
  get(URL: string, options: any, actionCallback: (res: any) => Action) {
    options.headers = this.getHeaders(options.headers || {});
    return this.http.get<any>(URL, {...options, responseType: 'json'}).pipe(
      map((res: HttpResponse<any>) => actionCallback(res))
    ).subscribe(
      action => {this.store.dispatch(action); }
    );
  }
  /** REST API POST request method */
  post(URL: string, body: Object, options: any, actionCallback: (res: any) => Action, errorCallback: (error: any) => any) {
    options.headers = this.getHeaders(options.headers || {});
    return this.http.post<any>(URL, body, {...options, responseType: 'json'}).pipe(
      map((res: HttpResponse<any>) => actionCallback(res))
    ).subscribe(
      action => {this.store.dispatch(action); },
      err => {
        errorCallback(err);
      });
  }
}
