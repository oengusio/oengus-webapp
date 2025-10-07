import { Injectable, inject } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { PatronApiResponse } from '../model/patron';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatreonService extends BaseService {
  private http = inject(HttpClient);


  private cachedPatrons: PatronApiResponse | null = null;

  constructor() {
    const toastr = inject(NwbAlertService);

    super(toastr);
  }

  fetchPatrons(): Observable<PatronApiResponse> {
    if (this.cachedPatrons != null) {
      return of(this.cachedPatrons);
    }

    return this.http.get<PatronApiResponse>(`${environment.patronApi}/patrons`)
      .pipe(tap((response) => {
        this.cachedPatrons = response;
      }));
  }
}
