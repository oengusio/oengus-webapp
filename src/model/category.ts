import { Opponent } from './opponent';
import { RunType } from './schedule-line';

export class Category {

  id: number;
  name: string;
  estimate: string;
  /**
   * @deprecated use the service to convert on blur
   */
  estimateHuman: string;
  description: string;
  video: string;
  visible: boolean;
  type: RunType;
  code: string;
  status: string;
  expectedRunnerCount: number;
  opponents: Opponent[];

  constructor() {
    this.id = -1;
    this.expectedRunnerCount = 0;
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

// export enum RunType {
//   SINGLE = 'SINGLE',
//   RACE = 'RACE',
//   COOP = 'COOP',
//   COOP_RACE = 'COOP_RACE',
//   OTHER = 'OTHER',
//   RELAY = 'RELAY',
//   RELAY_RACE = 'RELAY_RACE',
// }
