import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PatronApiResponse } from '../../model/patron';

@Injectable()
export class PatronsResolver {
  private http = inject(HttpClient);


  resolve():
    Observable<PatronApiResponse> | Promise<PatronApiResponse> | PatronApiResponse {
    return this.http.get<PatronApiResponse>(`${environment.patronApi}/patrons`);
  }
}
