import { RunStatus } from './category';

export class HistoryMarathon {
  marathonId: string;
  marathonName: string;
  marathonStartDate: Date;
}

export class UserProfileHistory extends HistoryMarathon {
  visible: boolean;
  games: HistoryGame[];
}

export interface HistoryGame {
  categories: HistoryGameCategory[];
  console: string;
  description: string;
  emulated: boolean;
  id: number;
  name: string;
  ratio: string;
  // submission: any; // HistoryGameSubmission
}

export interface HistoryGameCategory {
  code: string|null;
  description: string;
  estimate: string;
  id: number;
  name: string;
  // opponentDtos: any[]|null; // Array<OpponentCategoryDto>|null
  // opponents: any[]; // Array<Opponent>
  status: keyof typeof RunStatus;
  type: string;
  video: string;
}

export interface SavedGame {
  id: number;
  name: string;
  ratio: string;
  description: string;
  console: string;
  emulated: boolean;
  categories: SavedCategory[];
}

export interface SavedCategory {
  id: number;
  gameId: number;
  name: string;
  description: string;
  estimate: string;
  video: string;
}
