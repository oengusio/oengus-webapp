import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { SavedGame } from '../model/user-profile-history';
import { Observable } from 'rxjs';

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
    return this.http.post<SavedGame>(this.v2Url(''), game);
  }

  update(game: Optional<SavedGame, 'categories'>): Observable<SavedGame> {
    if (game.categories) {
      delete game.categories;
    }

    return this.http.patch<SavedGame>(this.v2Url(`/${game.id}`), game);
  }
}
