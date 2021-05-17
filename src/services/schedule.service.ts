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

  getAllForMarathon(marathonId: string, customData: boolean = false): Observable<Schedule> {
    const query = customData ? '?withCustomData=true' : '';

    return this.http.get<Schedule>(this.url(`${marathonId}/schedule${query}`));
  }

  save(marathonId: string, schedule: Schedule) {
    return this.http.put(this.url(`${marathonId}/schedule`), schedule, {observe: 'response'})
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

  exportAllForMarathon(marathonId: string, format: string) {
    const exportUrl = this.url(`${marathonId}/schedule/export?format=${format}&zoneId=${
      moment.tz.guess()}&locale=${localStorage.getItem('language')}`);
    this.http.get(exportUrl, {responseType: 'text'})
      .subscribe(response => {
          const blob = new Blob([response], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);

          if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, marathonId + '-schedule.' + format);
          } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = marathonId + '-schedule.' + format;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          window.URL.revokeObjectURL(url);
        },
        error => {
          this.translateService.get('alert.schedule.export.error').subscribe((res: string) => {
            this.toast(res, 3000, 'warning');
          });
        });
  }
}
