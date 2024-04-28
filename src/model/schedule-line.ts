import { User } from './user';

/**
 * @deprecated v1 api, for removal when old UI is phased out in the future.
 */
export type ScheduleRunner = { user: User } | { runnerName: string };

/**
 * @deprecated v1 api, for removal when old UI is phased out in the future.
 */
export class ScheduleLine {

  id: number;
  gameName: string;
  console: string;
  emulated: boolean;
  ratio: string;
  categoryName: string;
  estimate: string;
  estimateHuman: string;
  setupTime: string;
  setupTimeHuman: string;
  setupBlock: boolean;
  setupBlockText: string;
  useSetupBlockText: boolean;
  customRun: boolean;
  position: number;
  /**
   * @deprecated
   */
  categoryId: number;
  runners: ScheduleRunner[];
  date: Date;
  type: string;
  customData: string;

  constructor() {
    this.id = -1;
    this.runners = [];
  }
}

export type RunType = 'SINGLE' | 'RACE' | 'COOP' | 'COOP_RACE' | 'RELAY' | 'RELAY_RACE' | 'OTHER';

// Profile should always be preferred over runnerName.
// runnerName will always be set as a way of convenience for devs.
// Only one property can be sent (not-null) at a time.
export interface LineRunner {
  runnerName?: string;
  profile?: { id: number; username: string; };
}

// TODO: should I still store the categoryId? It does help with the UI so it might be worth it.
export interface V2ScheduleLine {
  id: number;
  game: string;
  console: string;
  emulated: boolean;
  ratio: string;
  type: RunType;
  runners: LineRunner[];
  category: string;
  estimate: string;
  setupTime: string;
  position: number;
  customRun: boolean;
  setupBlock: boolean;
  setupBlockText: string;
  customData: string;
  date: Date;
}
