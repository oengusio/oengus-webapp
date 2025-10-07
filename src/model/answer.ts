import { Question } from './question';

export class Answer {

  id: number;
  questionId: number;
  submissionId: number;
  question: Question;
  answer: string | boolean;
  username: string;

  constructor() {
    this.question = {
      description: '', fieldType: '', id: 0, label: '', options: [], position: 0, required: false, type: 'DONATION'
    };
  }
}
