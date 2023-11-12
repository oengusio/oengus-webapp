import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './BaseService';
import { LoginDetails, LoginResponse } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient,
              private router: Router,
              toastr: NwbAlertService) {
    super(toastr, 'auth');
  }

  performLogin(details: LoginDetails): Observable<LoginResponse> {
    details.twoFactorCode = details.twoFactorCode || null;

    return this.http.post<LoginResponse>(this.url('login', 'v2'), details);
  }
}
