import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './BaseService';
import { TemporalServiceService } from './termporal/temporal-service.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);
  private temporalService = inject(TemporalServiceService);


  constructor() {
    const toastr = inject(NotificationService);

    super(toastr, 'marathons');
  }

  // Cannot just return url, needs auth
  exportAllForMarathon(marathonId: string) {
    const exportUrl = this.url(`${marathonId}/submissions/export?locale=${
      localStorage.getItem('language')}&zoneId=${this.temporalService.timeZone.timeZone}`);
    this.http.get(exportUrl, {responseType: 'text'})
      .subscribe(response => {
          const blob = new Blob([response], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = marathonId + '-submissions.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
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
