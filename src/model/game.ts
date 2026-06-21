import { Category } from './category';

export class Game {
  id = -1;
  name = '';
  description = '';
  console: string;
  ratio = '';
  categories: Category[];
  emulated = false;
  visible = false;
  status = '';

  constructor() {
    this.console = '';
    this.categories = [];
  }
}
