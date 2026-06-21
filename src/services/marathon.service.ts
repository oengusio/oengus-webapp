import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Marathon, MarathonRaw, MarathonSettings, MarathonSettingsRawApi } from '../model/marathon';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { UserService } from './user.service';
import { HomepageMetadata, HomepageMetaDataRaw } from '../model/homepage-metadata';
import { TranslateService } from '@ngx-translate/core';
import { SelfUser, User } from '../model/user';
import { BaseService } from './BaseService';
import { parseMastodonUrl } from '../utils/helpers';
import { Question } from '../model/question';
import { BooleanStatusDto, DataListDto } from '../model/dto/base-dtos';
import { map } from 'rxjs/operators';
import { UserProfile } from '../model/user-profile';
import { TemporalServiceService } from './termporal/temporal-service.service';

@Injectable({
  providedIn: 'root',
})
export class MarathonService extends BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userService = inject(UserService);
  private translateService = inject(TranslateService);
  private temporalService = inject(TemporalServiceService);

  private _marathon: Marathon = new Marathon();

  get marathon(): Marathon {
    return this._marathon;
  }

  set marathon(value: Marathon) {
    this._marathon = value;
  }

  get mastodonUrl(): string {
    if (!this.marathon.mastodon) {
      return '';
    }

    return parseMastodonUrl(this.marathon.mastodon);
  }

  constructor() {
    const toastr = inject(NwbAlertService);

    super(toastr, 'marathons');
  }

  create(marathon: Marathon): Subscription {
    marathon.creator = this.userService.user;
    return this.http.put(this.url(''), marathon, {observe: 'response'}).subscribe((response) => {
      this.router.navigate(['/marathon/' + response.headers.get('Location')]);

      this.translateService.get('alert.marathon.creation.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, () => {
      this.translateService.get('alert.marathon.creation.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }

  updateSettings(marathon: Partial<MarathonSettings> & { id: string }): Observable<MarathonSettings> {
    return this.http.patch<MarathonSettingsRawApi>(this.v2Url(`${marathon.id}/settings`), {
      ...marathon,
      startDate: marathon.startDate?.toInstant().toString(),
      endDate: marathon.endDate?.toInstant().toString(),
      submissionsStartDate: marathon.submissionsStartDate?.toInstant()?.toString(),
      submissionsEndDate: marathon.submissionsEndDate?.toInstant()?.toString(),
    }).pipe(
      this.mapMarathonSettings(),
    );
  }

  updateQuestions(marathonId: string, questions: Question[]): Observable<boolean> {
    return this.http.put<BooleanStatusDto>(
      this.v2Url(`${marathonId}/settings/questions`),
      {questions},
    )
      .pipe(map(x => x.status));
  }

  updateModerators(marathonId: string, userIds: number[]): Observable<boolean> {
    return this.http.put<BooleanStatusDto>(
      this.v2Url(`${marathonId}/settings/moderators`),
      {userIds},
    )
      .pipe(map(x => x.status));
  }

  publishSelection(marathon: Marathon) {
    return this.http.post(this.url(`${marathon.id}/selections/publish`), null).subscribe({
      next: () => {
        this._marathon = {...marathon, selectionDone: true, submitsOpen: false};
      },
      error: () => {
        this.translateService.get('alert.marathon.update.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      },
    });
  }

  exists(name: string): Observable<ValidationErrors> {
    return this.http.get<ValidationErrors>(this.url(`${name}/exists`));
  }

  find(name: string): Observable<Marathon> {
    return this.http.get<MarathonRaw>(this.url(`${name}`)).pipe(map((m) => this.mapSingleMarathon(m)));
  }

  delete(name: string) {
    this.http.delete(this.url(`${name}`)).subscribe(() => {
      this.translateService.get('alert.marathon.deletion.success').subscribe((res: string) => {
        this.toast(res);
      });
      this.router.navigate(['/']);
    }, () => {
      this.translateService.get('alert.marathon.deletion.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }

  findHomepageMetadata(): Observable<HomepageMetadata> {
    return this.http.get<HomepageMetaDataRaw>(this.v2Url('for-home')).pipe(this.mapHomepage());
  }

  findHomepageModerated(): Observable<{ marathons: Marathon[] }> {
    return this.http.get<{ marathons: Marathon[] }>(this.url('moderated-by/me'));
  }

  findForMonth(start: Date, end: Date): Observable<Marathon[]> {
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString())
      .set('zoneId', this.temporalService.timeZone.timeZone);

    return this.http.get<MarathonRaw[]>(this.url('forDates'), {params})
      .pipe(this.mapMarathons());
  }

  isArchived(marathon: Marathon = this._marathon): boolean {
    const endDate = this.temporalService.parseDate(marathon.endDate as unknown as string);

    return Temporal.ZonedDateTime.compare(endDate, this.temporalService.now) === -1;
  }

  fetchDiscordInfo(marathon: MarathonSettings | Marathon): Observable<{ id: string, name: string }> {
    return this.http.get<{ id: string, name: string }>(this.url(`${marathon.id}/discord/lookup-invite?invite_code=${marathon.discord}`));
  }

  isAdmin(user: User | SelfUser): boolean {
    if (!user) {
      return false;
    }
    return user.id === this.marathon.creator.id ||
      !!this.marathon.moderators.find(u => u.id === user.id) ||
      user.roles.includes('ROLE_ADMIN');
  }

  hasDstChange(): boolean {
    const startDate = this.temporalService.parseDate(this.marathon.startDate as unknown as string);
    const endDate = this.temporalService.parseDate(this.marathon.endDate as unknown as string);

    return startDate.offset !== endDate.offset;
  }

  isWebhookOnline(marathonId: string, url: string): Observable<unknown> {
    const params = new HttpParams().set('url', url);
    return this.http.get(this.url(`${marathonId}/webhook`), {
      params: params,
    });
  }

  loadSettings(marathonId: string): Observable<MarathonSettings> {
    return this.http.get<MarathonSettingsRawApi>(this.v2Url(`${marathonId}/settings`)).pipe(
      this.mapMarathonSettings(),
    );
  }

  loadQuestions(marathonId: string): Observable<DataListDto<Question>> {
    return this.http.get<DataListDto<Question>>(this.v2Url(`${marathonId}/settings/questions`));
  }

  loadModerators(marathonId: string): Observable<DataListDto<UserProfile>> {
    return this.http.get<DataListDto<UserProfile>>(this.v2Url(`${marathonId}/settings/moderators`));
  }

  private mapMarathonSettings(): OperatorFunction<MarathonSettingsRawApi, MarathonSettings> {
    return map((raw) => ({
      ...raw,
      startDate: this.temporalService.parseDate(raw.startDate),
      endDate: this.temporalService.parseDate(raw.endDate),
      // @ts-expect-error meh.
      submissionsStartDate: this.temporalService.parseDate(raw.submissionsStartDate),
      // @ts-expect-error meh.
      submissionsEndDate: this.temporalService.parseDate(raw.submissionsEndDate),
    }));
  }

  private mapMarathons(): OperatorFunction<MarathonRaw[], Marathon[]> {
    return map(
      (raw) => raw.map((marathon) => this.mapSingleMarathon(marathon)),
    );
  }

  private mapHomepage(): OperatorFunction<HomepageMetaDataRaw, HomepageMetadata> {
    return map((raw) => ({
      live: raw.live.map((m) => this.mapSingleMarathon(m)),
      next: raw.next.map((m) => this.mapSingleMarathon(m)),
      open: raw.open.map((m) => this.mapSingleMarathon(m)),
      moderated: [],
    }));
  }

  private mapSingleMarathon(marathon: MarathonRaw): Marathon {
    return {
      ...marathon,
      startDate: this.temporalService.parseDate(marathon.startDate),
      endDate: this.temporalService.parseDate(marathon.endDate),
      submissionsStartDate: this.temporalService.parseDate(marathon.submissionsStartDate),
      submissionsEndDate: this.temporalService.parseDate(marathon.submissionsEndDate),
    };
  }
}
