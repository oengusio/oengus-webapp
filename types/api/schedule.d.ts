import { FullMarathon } from './marathon';
import { User } from './user';
import { OengusState } from '~/plugins/oengus';

export enum RunType {
  SINGLE = 'SINGLE',
  RACE = 'RACE',
  COOP = 'COOP',
  COOP_RACE = 'COOP_RACE',
  OTHER = 'OTHER',
  RELAY = 'RELAY',
  RELAY_RACE = 'RELAY_RACE',
}

export interface ScheduleLine {
  categoryId: number;
  categoryName: string;
  console: string;
  cusomData: string;
  cusomDataDTO: string;
  customRun: boolean;
  date: string|Date;
  emulated: boolean;
  estimate: string; // Duration
  gameName: string;
  id: number;
  position: number;
  ratio: string;
  runners: Array<User>;
  schedule: Schedule;
  setupBlock: boolean;
  setupBlockText: string;
  setupTime: string; // Duration
  type: RunType;
}

export interface Schedule {
  id: number;
  lines: Array<ScheduleLine>;
  marathon: FullMarathon;
}

export interface ScheduleTicker {
  previous: ScheduleLine;
  current: ScheduleLine;
  next: ScheduleLine;
}

export interface ScheduleState extends OengusState {
  schedules: { [id: string]: Schedule };
  tickers: { [id: string]: ScheduleTicker };
}
