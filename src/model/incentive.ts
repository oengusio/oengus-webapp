import { ScheduleLine } from './schedule-line';
import { Bid } from './bid';

export class Incentive {
  id: number;
  scheduleLine: ScheduleLine;
  name = '';
  description = '';
  bidWar: boolean;
  locked: boolean;
  goal = -1;
  currentAmount: number;
  bids: Bid[];
  toDelete = false;
  openBid: boolean;

  constructor() {
    this.id = -1;
    this.scheduleLine = new ScheduleLine();
    this.currentAmount = 0;
    this.bidWar = false;
    this.locked = false;
    this.openBid = false;
    this.bids = [];
  }
}
