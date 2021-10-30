import { HistoryGameCategoryStatus } from './enums/history';
import { Duration } from './marathon';

export interface History {
  games: Array<HistoryGame>;
  marathonId: string;
  marathonName: string;
  marathonStartDate: string|Date;
  opponents: Array<any>; // Array<HistoryOpponent>
}

export interface HistoryGame {
  categories: Array<HistoryGameCategory>
  console: string;
  description: string;
  emulated: boolean;
  id: number;
  name: string;
  ratio: string;
  submission: any; // HistoryGameSubmission
}

export interface HistoryGameCategory {
  code: string|null;
  description: string;
  estimate: Duration;
  id: number;
  name: string;
  opponentDtos: Array<any>|null; // Array<OpponentCategoryDto>|null
  opponents: Array<any>; // Array<Opponent>
  status: keyof typeof HistoryGameCategoryStatus;
  type: string;
  video: string;
}
