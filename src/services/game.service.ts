import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment-timezone';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  exportAllForMarathon(marathonId: string) {
    const exportUrl = this.url(`${marathonId}/submissions/export?locale=${
      localStorage.getItem('language')}&zoneId=${moment.tz.guess()}`);
    this.http.get(exportUrl, {responseType: 'text'})
      .subscribe(response => {
          const blob = new Blob([response], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);

          if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, marathonId + '-submissions.csv');
          } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = marathonId + '-submissions.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          window.URL.revokeObjectURL(url);
        },
        () => {
          this.translateService.get('alert.game.export.error').subscribe((res: string) => {
            this.toast(res, 3000, 'warning');
          });
        });
  }

  delete(marathonId: string, gameId: number) {
    return this.http.delete(this.url(`${marathonId}/submissions/games/${gameId}`)).subscribe(() => {
      this.translateService.get('alert.game.deletion.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, () => {
      this.translateService.get('alert.game.deletion.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }
}
