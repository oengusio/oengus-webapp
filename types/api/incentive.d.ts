import { FullMarathon } from './marathon';
import { OengusState } from './oengus-api';
import { ScheduleLine } from './schedule';

export interface Incentive {
  id: number;
  bidWar: boolean;
  bids: Array<IncentiveBid>;
  currentAmount: number;
  description: string;
  goal: number|null;
  locked: boolean;
  marathon: FullMarathon;
  name: string;
  openBid: boolean;
  scheduleLine: ScheduleLine;
  toDelete: boolean;
}

export interface IncentiveBid {
  id: number;
  approved: boolean;
  currentAmount: number;
  incentive: Incentive;
  incentiveId: number;
  name: string;
  toDelete: boolean;
}

export interface IncentiveList {
  incentives: Array<Incentive>;
}

export interface IncentiveState extends OengusState {
  incentives: { [id: string]: IncentiveList };
}
