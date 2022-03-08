import { RunType } from './enums/run';
import { FullMarathon } from './marathon';
import { OengusState } from './oengus-api';
import { User } from './user';

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
  previous?: ScheduleLine;
  current?: ScheduleLine;
  next?: ScheduleLine;
}

export interface ScheduleState extends OengusState {
  schedules: { [id: string]: Schedule };
  tickers: { [id: string]: ScheduleTicker };
}
