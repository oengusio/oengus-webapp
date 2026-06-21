import { BasicUserInfo, User } from './user';

/**
 * @deprecated v1 api, for removal when old UI is phased out in the future.
 */
export type ScheduleRunner = { user: User } | { runnerName: string };

/**
 * @deprecated v1 api, for removal when old UI is phased out in the future.
 */
export class ScheduleLine {
  id: number;
  gameName = '';
  console = '';
  emulated = false;
  ratio = '';
  categoryName = '';
  estimate = '';
  estimateHuman = '';
  setupTime = '';
  setupTimeHuman = '';
  setupBlock = false;
  setupBlockText = '';
  useSetupBlockText = false;
  customRun = false;
  position = -1;
  categoryId = -1;
  runners: ScheduleRunner[] = [];
  date: Date = new Date();
  type = '';
  customData = '';

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
  profile?: BasicUserInfo;
}

export interface V2ScheduleLineRawApi<DateType = string> {
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
  date: DateType;
  // This is only used in the UI to hide categories that have moved to the schedule.
  categoryId: number;
}

export type V2ScheduleLine = V2ScheduleLineRawApi<Temporal.ZonedDateTime>;
