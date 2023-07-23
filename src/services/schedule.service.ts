import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Schedule } from '../model/schedule';
import moment from 'moment-timezone';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

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

  getExportUrl(marathonId: string, format: string): string {
    return this.url(`${marathonId}/schedule/export?format=${format}&zoneId=${
      moment.tz.guess()}&locale=${localStorage.getItem('language')}`);
  }
}
