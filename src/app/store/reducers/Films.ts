import { deepClone } from '../../lib/Utils';
import {IFilm} from '../../types';
import {ActionTypesOfFilms} from '../../store/actions';

export interface State {
  films: IFilm[];
  film: IFilm | null;
}
export const initialState: State = {
  films: [],
  film: null,
};

export const Films = (state: State = initialState, action: any) => {
  const newState = deepClone(state);
  if (action.hasOwnProperty('data')) {
    const data = action.data;
    switch (action.type) {
      case ActionTypesOfFilms.GET_FILM_LIST:
        newState.films = data.VODs;
        return newState;
      case ActionTypesOfFilms.GET_FILM:
        newState.film = data.VODDetail;
        return newState;
      case ActionTypesOfFilms.CLEAR_SELECTED_FILM:
        newState.film = null;
        return newState;
      default:
        return state;
    }
  } else {
    return state;
  }
};
