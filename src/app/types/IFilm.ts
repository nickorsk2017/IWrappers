import {ICountry} from './ICountry';

export interface IFilm {
  ID: string | number;
  introduce: string;
  name: string;
  picture: {
    posters: string[]
  };
  produceZones?: ICountry[];
  rating?: {
    ID: string | number;
    name: string
  };
  castRoles?: {
    'casts': {
      'castName': string
    }[],
    'roleType': string | number
  }[];
}
