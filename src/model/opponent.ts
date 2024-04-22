import { User } from './user';
import { Availability } from './availability';

export class Opponent {

  id: number;
  users: User[];
  user: User;
  gameName: string;
  categoryId: number;
  categoryName: string;
  video: string;
  availabilities: Availability[];

  constructor() {
    this.id = -1;
    this.users = [];
    this.availabilities = [];
  }
}
