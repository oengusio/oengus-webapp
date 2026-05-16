import { User } from './user';
import { Game } from './game';
import { Availability, AvailabilityRawApi } from './availability';
import { Answer } from './answer';
import { Opponent } from './opponent';

export interface SubmissionRawApi<DateType = string> {
  id: number;
  user: User;
  games: Game[];
  availabilities: AvailabilityRawApi<DateType>[];
  answers: Answer[];
  opponents: Opponent[];
}

export class Submission implements SubmissionRawApi<Temporal.ZonedDateTime> {

  id: number;
  user: User;
  games: Game[];
  availabilities: Availability[];
  answers: Answer[];
  opponents: Opponent[];

  constructor() {
    this.id = -1;
    this.games = [];
    this.availabilities = [];
    this.answers = [];
    this.opponents = [];
  }
}
