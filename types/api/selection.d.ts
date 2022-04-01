import { RunStatus } from './enums/run';
import { OengusState } from './oengus-api';

export interface Selection {
  id: number;
  categoryId: number;
  status: keyof typeof RunStatus;
}

export interface Selections {
  [id: number]: Selection;
}

export interface SelectionState extends OengusState {
  selections: { [id: string]: Selections };
}
