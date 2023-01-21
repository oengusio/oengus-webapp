import { RunStatus, RunType } from './enums/run';
import { FullMarathon } from './marathon';
import { OengusState } from './oengus-api';
import { User } from './user';

export interface SubmissionPageResponse {
  content: Array<Submission>;
  totalPages: number;
  currentPage: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Submission {
  id: number;
  answers: Array<any>; // Array<Answer>
  availabilities: Array<SubmissionAvailability>;
  games: Array<SubmissionGame>;
  marathon: FullMarathon;
  opponentDtos: Array<SubmissionOpponentDto>|null;
  opponents: Array<SubmissionOpponent>;
  user: User;
}

export interface SubmissionList {
  submissions: Array<Submission>;
}

export interface SubmissionState extends OengusState {
  submissions: { [id: string]: SubmissionList };
}

export interface SubmissionAvailability {
  from: string|Date;
  to: string|Date;
}

export interface SubmissionCategory {
  id: number;
  code: string;
  description: string;
  estimate: string; // Duration
  game: SubmissionGame;
  name: string;
  opponentDtos: Array<SubmissionOpponentCategoryDto>;
  opponents: Array<SubmissionOpponent>;
  selection?: SubmissionSelection;
  status: keyof typeof RunStatus;
  type: RunType;
  video: string;
}

export interface SubmissionGame {
  id: number;
  categories: Array<SubmissionCategory>;
  console: string;
  description: string;
  emulated: boolean;
  name: string;
  ratio: string;
  submission: Submission;
}

export interface SubmissionOpponent {
  id: number;
  category: SubmissionCategory;
  submission: Submission;
  video: string;
}

export interface SubmissionOpponentDto {
  id: number;
  categoryId: number;
  gameName: string;
  users: Array<User>;
  video: string;
}

// This clearly needs details, I'll add them if we need them.
// There's so many "opponent" objects it's confusing.
export interface SubmissionOpponentCategoryDto {

}

export interface SubmissionSelection {
  id: number;
  category: SubmissionCategory;
  marathon: FullMarathon;
  status: keyof typeof RunStatus;
}
