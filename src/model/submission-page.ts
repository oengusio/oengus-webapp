import { Submission } from './submission';

export class Pagable {
  first: boolean;
  last: boolean;
  empty: boolean;
  totalPages: number;
  currentPage: number;
}

export class SubmissionPage extends Pagable {
  content: Submission[];

  constructor() {
    super();
    this.content = [];
  }

}
