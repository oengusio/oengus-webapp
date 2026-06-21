import { Question } from './question';

export class Answer {
  id = -1;
  questionId = -1;
  submissionId = -1;
  question: Question;
  answer: string | boolean = false;
  username = '';

  constructor() {
    this.question = {
      description: '', fieldType: '', id: 0, label: '', options: [], position: 0, required: false, type: 'DONATION'
    };
  }
}
