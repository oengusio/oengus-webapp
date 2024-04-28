import { Marathon } from './marathon';
import { ScheduleLine } from './schedule-line';

export class Schedule {

  id: number;
  marathon?: Marathon;
  lines: ScheduleLine[];

  constructor() {
    this.id = -1;
    this.lines = [];
  }
}

export interface ScheduleCreateRequest {
  name: string;
  slug: string;
}

export interface ScheduleInfo {
  id: number;
  marathonId: string;
  name: string;
  slug: string;
}
