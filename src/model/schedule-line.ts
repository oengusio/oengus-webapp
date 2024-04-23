import { User } from './user';

export type ScheduleRunner = { user: User } | { runnerName: string };

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
    this.runners = [];
  }
}
