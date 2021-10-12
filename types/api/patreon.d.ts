import { OengusState } from '~/plugins/oengus';

export interface Patron {
  id: string;
  /* eslint-disable-next-line camelcase */ // This is what the API returns, not much we can do about that.
  full_name: string;
  /* eslint-disable-next-line camelcase */ // This is what the API returns, not much we can do about that.
  image_url: string;
}

export interface Patrons {
  patrons: Array<Patron>;
}

export interface PatreonState extends OengusState {
  patrons?: Patrons;
}
