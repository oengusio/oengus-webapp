import { Opponent } from './opponent';

export class Category {

  id: number;
  name: string;
  estimate: string;
  /**
   * @deprecated use the component
   */
  estimateHuman: string;
  description: string;
  video: string;
  visible: boolean;
  type: string;
  code: string;
  status: string;
  opponentDtos: Opponent[];

  constructor() {
    this.opponentDtos = [];
    this.type = 'SINGLE';
  }
}
