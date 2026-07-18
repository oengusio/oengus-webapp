import { inject, Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Language } from '../model/language';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MiscService extends BaseService {
  private http = inject(HttpClient);

  constructor() {
    const toastr = inject(NotificationService);

    super(toastr);
  }

  searchPronouns(pronouns: string): Observable<string[]> {
    return this.http.get<string[]>(this.url(`pronouns?search=${pronouns}`));
  }

  searchLanguage(search: string): Observable<Language[]> {
    return this.http.get<Language[]>(this.url(`languages?search=${search}&locale=${localStorage.getItem('language')}`));
  }
}
