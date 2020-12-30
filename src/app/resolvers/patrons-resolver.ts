import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PatronApiResponse} from '../../model/patron';

@Injectable()
export class PatronsResolver implements Resolve<PatronApiResponse> {

  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<PatronApiResponse> | Promise<PatronApiResponse> | PatronApiResponse {
    return this.http.get<PatronApiResponse>(`${this.patronUrl}/patrons`);
  }

  private get patronUrl(): string {
    return environment.patronApi || environment.api + '/patreon';
  }
}
