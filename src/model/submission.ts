import { User } from './user';
import { Game } from './game';
import { Availability } from './availability';
import { Answer } from './answer';
import { Opponent } from './opponent';

export class Submission {

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
