import { Question } from './question';

export class DonationExtraData {

  id: number;
  question: Question;
  answer: string;

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
