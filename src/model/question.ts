export type QuestionType = 'SUBMISSION' | 'DONATION';

export interface Question {

  id: number;
  label: string;
  fieldType: string; // TODO: type these
  required: boolean;
  options: string[];
  type: QuestionType;
  description: string;
  position: number;
}
