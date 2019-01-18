import { deepClone } from '../../lib/Utils';
import {} from '../../types';
import {ActionTypesOfCountries} from '../../store/actions';

export interface State {
  countries: any[];
}
export const initialState: State = {
  countries: [],
};

export const Countries = (state: State = initialState, action: any) => {
  const newState = deepClone(state);
  if (action.hasOwnProperty('data')) {
    const data = action.data;
    switch (action.type) {
      case ActionTypesOfCountries.GET_COUNTRIES_LIST:
        newState.countries = data;
        return newState;
      default:
        return state;
    }
  } else {
    return state;
  }
};
