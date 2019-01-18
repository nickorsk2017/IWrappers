import {Injectable} from '@angular/core';
import {API} from '../services/special/API';
import {createURL} from '../lib/Utils';
import { environment } from '../../environments/environment';
import {ActionTypesOfCountries} from '../store/actions';
import {Store} from '@ngrx/store';

@Injectable()
export class CountriesService {
  constructor (private api: API, private store: Store<any>) {}
  private ROOT_URL = environment.api.url;
  /** Paths of requests */
  paths = {
    countriesList: this.ROOT_URL + '/list/countries',
  };
  /** Request: getCountriesData **/
  getCountriesList() {
    // create URL with params
    const URL = createURL(
      this.paths.countriesList,
      {}
    );
    return this.api.get(
      URL,
      {},
      // reducer callback
      (res: any) => {
        return { type: ActionTypesOfCountries.GET_COUNTRIES_LIST, data: res.data};
      }
    );
  }
}
