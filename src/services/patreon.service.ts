import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { PatronApiResponse } from '../model/patron';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatreonService extends BaseService {

  private cachedPatrons: PatronApiResponse | null = null;

  constructor(private http: HttpClient,
              toastr: NwbAlertService) {
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
