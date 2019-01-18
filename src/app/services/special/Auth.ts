import {Injectable} from '@angular/core';
import {ActionTypesOfAuth} from '../../store/actions';
import {Store} from '@ngrx/store';
import {setCookie, delete_cookie} from '../../lib/Utils';

@Injectable()
export class Auth {
  constructor (private store: Store<any>) {}

  login() {
    setCookie('auth', true, 1);
    this.store.dispatch({type: ActionTypesOfAuth.LOGIN, data: {}});
  }
  logout() {
    delete_cookie('auth');
    this.store.dispatch({type: ActionTypesOfAuth.LOGOUT, data: {}});
  }
}
