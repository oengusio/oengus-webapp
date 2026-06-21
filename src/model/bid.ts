export class Bid {
  id = -1;
  name = '';
  currentAmount: number;
  approved = false;
  isNew = false;
  incentiveId = -1;
  toDelete = false;

  constructor() {
    this.currentAmount = 0;
  }
}
