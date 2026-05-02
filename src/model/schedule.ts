import { Marathon } from './marathon';
import { ScheduleLine, V2ScheduleLine, V2ScheduleLineRawApi } from './schedule-line';

export class Schedule {
  id: number;
  name: string;
  slug: string;
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

export interface ScheduleInfo extends ScheduleCreateRequest {
  id: number;
  marathonId: string;
  published: boolean;
}

export interface V2ScheduleRawApi<DateType = string> extends ScheduleInfo {
  lines: V2ScheduleLineRawApi<DateType>[];
}

export type V2Schedule = V2ScheduleRawApi<Temporal.ZonedDateTime>;
