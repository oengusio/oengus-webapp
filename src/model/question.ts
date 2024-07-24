export interface Question {

  id: number;
  label: string;
  fieldType: string;
  required: boolean;
  options: string[];
  type: string;
  description: string;
  position: number;
}
