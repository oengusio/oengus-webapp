import { Game } from './game';
import { Opponent } from './opponent';
import { RunStatus } from './category';

export class UserProfileHistory {

  marathonId: string;
  marathonName: string;
  marathonStartDate: Date;
  visible: boolean;
  games: HistoryGame[];
  opponentDtos: Opponent[];
  status: string;

}
export interface HistoryGame {
  categories: Array<HistoryGameCategory>;
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
  estimate: string;
  id: number;
  name: string;
  opponentDtos: Array<any>|null; // Array<OpponentCategoryDto>|null
  opponents: Array<any>; // Array<Opponent>
  status: keyof typeof RunStatus;
  type: string;
  video: string;
}
