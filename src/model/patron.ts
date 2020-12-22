export default class Patron {
  full_name: string;
  id: string;

  constructor() {
    this.full_name = '';
    this.id = '';
  }
}

export class PatronApiResponse {
  patrons: Patron[];

  constructor() {
    this.patrons = [];
  }
}
