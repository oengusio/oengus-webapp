import { inject, Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { PatronApiResponse } from '../model/patron';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PatreonService extends BaseService {
  private http = inject(HttpClient);


  private cachedPatrons: PatronApiResponse | null = null;

  constructor() {
    const toastr = inject(NotificationService);

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
