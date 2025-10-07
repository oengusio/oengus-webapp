import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { ScheduleCreateRequest, ScheduleInfo, V2Schedule } from '../model/schedule';
import moment from 'moment-timezone';
import { BaseService } from './BaseService';
import { BooleanStatusDto, DataListDto } from '../model/dto/base-dtos';
import { V2ScheduleLine } from '../model/schedule-line';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService {
  private http = inject(HttpClient);

  private scheduleCache = new Map<string, ScheduleInfo[]>();

  constructor() {
    const toastr = inject(NwbAlertService);

    super(toastr, 'marathons');
  }

  getAllOverview(marathonId: string): Observable<ScheduleInfo[]> {
    if (this.scheduleCache.has(marathonId)) {
      return of(this.scheduleCache.get(marathonId));
    }

    // In theory, we only have one instance of the application in a browser tab
    // this means that clearing it is a safe call, and if the page refreshes this is cleared either way.
    this.scheduleCache.clear();

    return this.http.get<DataListDto<ScheduleInfo>>(this.v2Url(`${marathonId}/schedules`)).pipe(
      map((res) => res.data),

      // Tapping the wire for our own gain, hehe
      tap((scheduleData) => {
        this.scheduleCache.set(marathonId, scheduleData);
      })
    );
  }

  getAllOverviewManagement(marathonId: string): Observable<ScheduleInfo[]> {
    return this.http.get<DataListDto<ScheduleInfo>>(this.v2Url(`${marathonId}/schedules/manage`)).pipe(
      map((res) => res.data),
    );
  }

  getInfoById(marathonId: string, scheduleId: number): Observable<ScheduleInfo> {
    return this.http.get<ScheduleInfo>(this.v2Url(`${marathonId}/schedules/${scheduleId}`));
  }

  getInfoByIdManagement(marathonId: string, scheduleId: number): Observable<ScheduleInfo> {
    return this.http.get<ScheduleInfo>(this.v2Url(`${marathonId}/schedules/${scheduleId}/manage`));
  }

  deleteById(marathonId: string, scheduleId: number): Observable<void> {
    return this.http.delete<void>(this.v2Url(`${marathonId}/schedules/${scheduleId}/manage`));
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
    return this.http.patch<ScheduleInfo>(this.v2Url(`${marathonId}/schedules/${scheduleId}/manage`), data);
  }

  getLines(marathonId: string, scheduleId: number): Observable<DataListDto<V2ScheduleLine>> {
    return this.http.get<DataListDto<V2ScheduleLine>>(this.v2Url(`${marathonId}/schedules/${scheduleId}/manage/lines`));
  }

  updateLines(marathonId: string, scheduleId: number, lines: V2ScheduleLine[]): Observable<DataListDto<V2ScheduleLine>> {
    return this.http.put<DataListDto<V2ScheduleLine>>(
      this.v2Url(`${marathonId}/schedules/${scheduleId}/manage/lines`),
      {
        data: lines,
      }
    );
  }

  publish(marathonId: string, scheduleId: number): Observable<BooleanStatusDto> {
    return this.http.post<BooleanStatusDto>(
      this.v2Url(`${marathonId}/schedules/${scheduleId}/manage/publish`),
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
}
