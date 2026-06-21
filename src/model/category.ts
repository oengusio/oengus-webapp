import { Opponent } from './opponent';
import { RunType } from './schedule-line';

export class Category {
  id: number;
  name = '';
  estimate = '';
  /**
   * @deprecated use the service to convert on blur
   */
  estimateHuman = '';
  description = '';
  video = '';
  visible = false;
  type: RunType;
  code = '';
  status = '';
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
