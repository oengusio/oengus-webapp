import { Opponent } from './opponent';

export class Category {

  id: number;
  name: string;
  estimate: string;
  /**
   * @deprecated use the component
   */
  estimateHuman: string;
  description: string;
  video: string;
  visible: boolean;
  type: string;
  code: string;
  status: string;
  opponents: Opponent[];

  constructor() {
    this.id = -1;
    this.opponents = [];
    this.type = 'SINGLE';
  }
}

export enum RunStatus {
  VALIDATED,
  BONUS,
  BACKUP,
  TODO,
  REJECTED,
}

export enum RunType {
  SINGLE = 'SINGLE',
  RACE = 'RACE',
  COOP = 'COOP',
  COOP_RACE = 'COOP_RACE',
  OTHER = 'OTHER',
  RELAY = 'RELAY',
  RELAY_RACE = 'RELAY_RACE',
}
