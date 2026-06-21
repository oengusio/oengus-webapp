import { Question } from './question';

export class DonationExtraData {
  id = -1;
  question: Question;
  answer: string | boolean = false;

  constructor() {
    this.question = {
      id: 0,
      label: '',
      fieldType: '',
      required: false,
      options: [],
      type: 'DONATION',
      description: '',
      position: 0
    };
  }
}
