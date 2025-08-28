import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { SavedCategory, SavedGame } from '../model/user-profile-history';
import { Observable } from 'rxjs';
import { BooleanStatusDto } from '../model/dto/base-dtos';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

@Injectable({
  providedIn: 'root'
})
export class SavedGamesService extends BaseService {

  constructor(
    private http: HttpClient,
    toastr: NwbAlertService
  ) {
    super(toastr, 'users/@me/saved-games');
  }

  create(game: SavedGame): Observable<SavedGame> {
    return this.http.post<SavedGame>(this.v2Url(), game);
  }

  update(game: Optional<SavedGame, 'categories'>): Observable<SavedGame> {
    if (game.categories) {
      delete game.categories;
    }

    return this.http.patch<SavedGame>(this.v2Url(`/${game.id}`), game);
  }

  delete(gameId: number) {
    return this.http.delete<BooleanStatusDto>(this.v2Url(`/${gameId}`));
  }

  createCategory(gameId: number, category: SavedCategory): Observable<SavedCategory> {
    return this.http.post<SavedCategory>(this.v2Url(`/${gameId}`), category);
  }

  updateCategory(gameId: number, category: SavedCategory): Observable<SavedCategory> {
    return this.http.patch<SavedCategory>(this.v2Url(`/${gameId}/${category.id}`), category);
  }

  deleteCategory(gameId: number, categoryId: number) {
    return this.http.delete<BooleanStatusDto>(this.v2Url(`/${gameId}/${categoryId}`));
  }
}
