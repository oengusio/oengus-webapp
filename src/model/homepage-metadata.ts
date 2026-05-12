import { Marathon, MarathonRaw } from './marathon';

export interface HomepageMetaDataRaw {
  next: MarathonRaw[];
  open: MarathonRaw[];
  live: MarathonRaw[];
}

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
