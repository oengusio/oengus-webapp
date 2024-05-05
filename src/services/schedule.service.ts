import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Schedule, ScheduleCreateRequest, ScheduleInfo, V2Schedule } from '../model/schedule';
import moment from 'moment-timezone';
import {BaseService} from './BaseService';
import { BooleanStatusDto, DataListDto } from '../model/dto/base-dtos';
import { V2ScheduleLine } from '../model/schedule-line';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  getAllOverview(marathonId: string): Observable<Array<ScheduleInfo>> {
    return this.http.get<DataListDto<ScheduleInfo>>(this.v2Url(`${marathonId}/schedules`)).pipe(
      map((res) => res.data)
    );
  }

  getInfoById(marathonId: string, scheduleId: number): Observable<ScheduleInfo> {
    return this.http.get<ScheduleInfo>(this.v2Url(`${marathonId}/schedules/${scheduleId}`));
  }

  deleteById(marathonId: string, scheduleId: number): Observable<void> {
    return this.http.delete<void>(this.v2Url(`${marathonId}/schedules/${scheduleId}`));
  }

  isSlugInUse(marathonId: string, slug: string): Observable<BooleanStatusDto> {
    return this.http.get<BooleanStatusDto>(this.v2Url(
      `${marathonId}/schedules/slug-exists?slug=${slug}`
    ));
  }

  getBySlug(marathonId: string, slug: string): Observable<V2Schedule> {
    // TODO: make slug a query param instead?
    return this.http.get<V2Schedule>(this.v2Url(
      `${marathonId}/schedules/for-slug/${slug}`
    ));
  }

  createSchedule(marathonId: string, data: ScheduleCreateRequest): Observable<ScheduleInfo> {
    return this.http.post<ScheduleInfo>(this.v2Url(`${marathonId}/schedules`), data);
  }

  updateSchedule(marathonId: string, scheduleId: number, data: ScheduleCreateRequest): Observable<ScheduleInfo> {
    return this.http.patch<ScheduleInfo>(this.v2Url(`${marathonId}/schedules/${scheduleId}`), data);
  }

  getLines(marathonId: string, scheduleId: number): Observable<DataListDto<V2ScheduleLine>> {
    return this.http.get<DataListDto<V2ScheduleLine>>(this.v2Url(`${marathonId}/schedules/${scheduleId}/lines`));
  }

  updateLines(marathonId: string, scheduleId: number, lines: Array<V2ScheduleLine>): Observable<DataListDto<V2ScheduleLine>> {
    return this.http.put<DataListDto<V2ScheduleLine>>(
      this.v2Url(`${marathonId}/schedules/${scheduleId}/lines`),
      {
        data: lines,
      }
    );
  }

  publish(marathonId: string, scheduleId: number): Observable<BooleanStatusDto> {
    return this.http.post<BooleanStatusDto>(
      this.v2Url(`${marathonId}/schedules/${scheduleId}/publish`),
      null
    );
  }

  getExportUrl(marathonId: string, scheduleId: number, format: string): string {
    return this.v2Url(`${marathonId}/schedules/${scheduleId}/export?format=${format}&zoneId=${
      moment.tz.guess()}&locale=${localStorage.getItem('language')}`);
  }

  fetchExport(marathonId: string, scheduleId: number, format: string): Observable<Blob> {
    return this.http.get(this.getExportUrl(marathonId, scheduleId, format), {responseType: 'blob'});
  }

  /////////////////
  // V1 stuff below

  /**
   * @deprecated this only gets the first schedule for a marathon
   */
  getAllForMarathon(marathonId: string, customData: boolean = false, adminRoute: boolean = false): Observable<Schedule> {
    const adminPart = adminRoute ? '/admin' : '';
    const query = customData ? '?withCustomData=true' : '';

    return this.http.get<Schedule>(this.url(`${marathonId}/schedule${adminPart}${query}`));
  }

  save(marathonId: string, schedule: Schedule) {
    const fixedSchedule = Object.assign({}, schedule);

    // @ts-ignore
    fixedSchedule.lines = fixedSchedule.lines.map((line) => ({
      ...line,
      runners: line.runners.map((runner) => {
        if ('runnerName' in runner) {
          return {
            runnerName: runner.runnerName,
          };
        }

        return {
          user: {
            id: runner.user.id,
            username: runner.user.username,
          },
        };
      }),
    }));

    return this.http.put(this.url(`${marathonId}/schedule`), fixedSchedule, {observe: 'response'})
      .subscribe((response: any) => {
        this.translateService.get('alert.schedule.save.success').subscribe((res: string) => {
          this.toast(res);
      });
    }, error => {
      this.translateService.get('alert.schedule.save.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }
}
