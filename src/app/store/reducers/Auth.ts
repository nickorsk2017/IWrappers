import { deepClone } from '../../lib/Utils';
import {} from '../../types';
import {ActionTypesOfAuth} from '../../store/actions';

export interface State {
  isLogin: boolean;
}
export const initialState: State = {
  isLogin: false,
};

export const Auth = (state: State = initialState, action: any) => {
  const newState = deepClone(state);
  switch (action.type) {
    case ActionTypesOfAuth.LOGIN:
      newState.isLogin = true;
      return newState;
    case ActionTypesOfAuth.LOGOUT:
      newState.isLogin = false;
      return newState;
    default:
      return state;
  }
};
