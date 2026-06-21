import { Submission } from './submission';

export class Pagable {
  first = false;
  last = false;
  empty = false;
  totalPages = -1;
  currentPage = -1;
}

export class SubmissionPage extends Pagable {
  content: Submission[];

  constructor() {
    super();
    this.content = [];
  }

}
