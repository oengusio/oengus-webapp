import { Question } from './question';

export class Answer {

  id: number;
  questionId: number;
  submissionId: number;
  question: Question;
  answer: any;
  username: string;

  constructor() {
    this.question = new Question('SUBMISSION');
  }
}
