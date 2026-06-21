import { User } from './user';
import { Availability } from './availability';

export class Opponent {
  id: number;
  users: User[];
  user: User = new User();
  gameName = '';
  categoryId = -1;
  categoryName = '';
  video = '';
  availabilities: Availability[];

  constructor() {
    this.id = -1;
    this.users = [];
    this.availabilities = [];
  }
}
