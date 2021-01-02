import { Marathon } from './marathon';

export class HomepageMetadata {

  next: Marathon[];
  open: Marathon[];
  live: Marathon[];
  moderated: Marathon[];

  constructor() {
    this.next = [];
    this.open = [];
    this.live = [];
    this.moderated = [];
  }
}
