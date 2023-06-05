export default class Patron {
  full_name: string;
  image_url: string;
  id: string;

  constructor() {
    this.full_name = '';
    this.image_url = '';
    this.id = '';
  }
}

export class PatronApiResponse {
  patrons: Patron[];

  constructor() {
    this.patrons = [];
  }
}
