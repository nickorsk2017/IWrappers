import {Injectable} from '@angular/core';
import {API} from '../services/special/API';
import {createURL} from '../lib/Utils';
import { environment } from '../../environments/environment';
import {ActionTypesOfFilms} from '../store/actions';
import {Subject} from 'rxjs/Subject';
import {IFilm} from '../types';
import {Store} from '@ngrx/store';

@Injectable()
export class FilmsService {
  showFilmDetailEvent: Subject<IFilm> = new Subject();
  constructor (private api: API, private store: Store<any>) {}
  private ROOT_URL = environment.api.url;
  /** Paths of requests */
  paths = {
    listFilms: this.ROOT_URL + '/list/films',
    film: this.ROOT_URL + '/film'
  };
  /** Request: getListOfFilms **/
  getListOfFilms() {
    // create URL with params
    const URL = createURL(
      this.paths.listFilms,
      {}
    );
    return this.api.get(
      URL,
      {},
      // reducer callback
      (res: any) => {
        return { type: ActionTypesOfFilms.GET_FILM_LIST, data: res.data};
      }
    );
  }
  /** Request: getDetailOfFilm **/
  getDetailOfFilm(filmId: string | number) {
    // create URL with params
    const URL = createURL(
      this.paths.film,
      {'id': filmId}
    );
    return this.api.get(
      URL,
      {},
      // reducer callback
      (res: any) => {
        return { type: ActionTypesOfFilms.GET_FILM, data: res.data};
      }
    );
  }
  clearDetailOfFilm() {
    this.store.dispatch({type: ActionTypesOfFilms.CLEAR_SELECTED_FILM, data: {}});
  }
}
