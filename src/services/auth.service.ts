import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseService } from './BaseService';
import { InitMFADto, LoginDetails, LoginResponse } from '../model/auth';
import { environment } from '../environments/environment';
import { SignupDto, SignupResponseDto } from '../model/dto/signup-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient,
              private router: Router,
              toastr: NwbAlertService) {
    super(toastr, 'auth');
  }

  getRedirectUri() {
    return encodeURIComponent(environment.loginRedirect);
  }

  getSyncRedirectUri() {
    return encodeURIComponent(environment.syncRedirect);
  }

  getTwitchClientId() {
    return environment.twitchClientId;
  }

  getTwitterClientId() {
    return environment.twitterClientId;
  }

  getDiscordClientId() {
    return environment.discordClientId;
  }

  getDiscordAuthUri(sync = false) {
    const redirectUri = sync ? this.getSyncRedirectUri() : this.getRedirectUri();

    return 'https://discord.com/oauth2/authorize?client_id=' +
      this.getDiscordClientId() + '&redirect_uri=' +
      redirectUri + 'discord&response_type=code&scope=identify&prompt=none';
  }

  getTwitchAuthUrl(sync = false) {
    const redirectUri = sync ? this.getSyncRedirectUri() : this.getRedirectUri();

    return 'https://id.twitch.tv/oauth2/authorize?client_id=' +
      this.getTwitchClientId() + '&redirect_uri=' +
      redirectUri + 'twitch&response_type=code&scope=openid';
  }

  getTwitterAuthUrl(sync = false) {
    const redirectUri = sync ? this.getSyncRedirectUri() : this.getRedirectUri();

    return 'https://twitter.com/i/oauth2/authorize?client_id=' +
      this.getTwitterClientId() + '&redirect_uri=' +
      redirectUri + 'twitter' +
      '&response_type=code&scope=users.read%20tweet.read' +
      '&code_challenge=speedrun&code_challenge_method=plain&state=unused';
  }

  get patreonSyncUrl(): string {
    return `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${
      environment.patreonClientId
    }&scope=identity&redirect_uri=${this.getSyncRedirectUri()}patreon`;
  }

  performLogin(details: LoginDetails): Observable<LoginResponse> {
    details.twoFactorCode = details.twoFactorCode || null;

    return this.http.post<LoginResponse>(this.v2Url('login'), details);
  }

  performRegister(details: SignupDto): Promise<SignupResponseDto> {
    return firstValueFrom(
      this.http.post<SignupResponseDto>(this.v2Url('signup'), details)
    );
  }

  requestNewVerificationEmail() {
    return this.http.post<{ status: boolean }>(this.v2Url('verify-email'), null);
  }

  requestPasswordReset(email: String) {
    return this.http.post<{ status: string }>(this.v2Url('password-reset/request'), { email });
  }

  resetPassword(token: String, newPassword: String) {
    return this.http.post<{ status: string }>(this.v2Url('password-reset'), {
      token,
      password: newPassword,
    });
  }

  initMfaSettings(): Observable<InitMFADto> {
    return this.http.put<InitMFADto>(this.v2Url('mfa/init'), null);
  }

  storeMfa(code: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(`${this.v2Url('mfa')}?code=${code}`, null);
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get tokenExpirationDate(): Date {
    const [_, body] = this.token.split('.');
    const { exp }: { exp: number } = JSON.parse(atob(body));

    if (!exp) {
      return new Date(0);
    }

    return new Date(exp * 1000); // exp is in seconds
  }

  // TODO: get distance between days, refresh token if it's only 1 day from expiry
  get shouldRenewToken(): boolean {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(this.tokenExpirationDate.getTime() - Date.now());

    // Convert back to days and return true if we are within 1 day of expiry
    return Math.round(differenceMs / ONE_DAY) <= 1;
  }

  /**
   * @return true if the current date is greater than the exp date of the token.
   */
  isTokenExpired(): boolean {
    return new Date() > this.tokenExpirationDate;
  }
}
