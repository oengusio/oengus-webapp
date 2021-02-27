import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../model/user-profile';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private _user: User;

  constructor(private http: HttpClient,
              private router: Router,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr);
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

  getDiscordClientId() {
    return environment.discordClientId;
  }

  getDiscordAuthUri(sync = false) {
    const redirectUri = sync ? this.getSyncRedirectUri() : this.getRedirectUri();

    return 'https://discordapp.com/api/oauth2/authorize?client_id=' +
      this.getDiscordClientId() + '&redirect_uri=' +
      redirectUri + 'discord&response_type=code&scope=identify';
  }

  getTwitchAuthUrl(sync = false) {
    const redirectUri = sync ? this.getSyncRedirectUri() : this.getRedirectUri();

    return 'https://id.twitch.tv/oauth2/authorize?client_id=' +
      this.getTwitchClientId() + '&redirect_uri=' +
      redirectUri + 'twitch&response_type=code&scope=openid';
  }

  login(service: string, code?: string, oauthToken?: string, oauthVerifier?: string): Observable<any> {
    return this.http.post(this.url('/user/login'), {
      service: service,
      code: code,
      oauthToken: oauthToken,
      oauthVerifier: oauthVerifier
    });
  }

  sync(service: string, code?: string, oauthToken?: string, oauthVerifier?: string): Observable<any> {
    return this.http.post(this.url('/user/sync'), {
      service: service,
      code: code,
      oauthToken: oauthToken,
      oauthVerifier: oauthVerifier
    });
  }

  logout() {
    this._user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(this.url('user/me'));
  }

  me() {
    return this.getMe().subscribe((response: User) => {
      this._user = response;
      // TODO: tracker this.matomoTracker.setUserId(this._user.username);
      if (!this._user.mail) {
        this.router.navigate(['user/new']);
      }
    }, error => {
      this._user = null;
    });
  }

  update(user: User) {
    return this.http.patch(this.url(`user/${user.id}`), user).subscribe(() => {
      if (!user.enabled) {
        this.translateService.get('alert.user.deactivate.success').subscribe((res: string) => {
          this.toast(res);
        });
        this.logout();
        return;
      }
      this._user = {...this._user, ...user};
      localStorage.setItem('user', JSON.stringify(this._user));
      this.translateService.get('alert.user.update.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, () => {
      this.translateService.get('alert.user.update.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }

  exists(name: string): Observable<ValidationErrors> {
    return this.http.get<ValidationErrors>(this.url(`user/${name}/exists`));
  }

  search(name: string): Observable<User[]> {
    return this.http.get<User[]>(this.url(`user/${name}/search`));
  }

  ban(id: number): Observable<void> {
    return this.http.post<void>(this.url(`user/${id}/ban`), null);
  }

  unban(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`user/${id}/ban`));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`user/${id}`));
  }

  getProfile(name: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.url(`user/${name}`));
  }

  isBanned(): boolean {
    return this._user.roles.includes('ROLE_BANNED');
  }

  isAdmin(): boolean {
    return this._user.roles.includes('ROLE_ADMIN');
  }

  isLoggedIn(): boolean {
    return Boolean(this._user);
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get user(): User {
    return this._user;
  }
}
