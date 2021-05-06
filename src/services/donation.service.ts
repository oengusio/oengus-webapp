import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Donation } from '../model/donation';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from '../model/page';
import { DonationStats } from '../model/donation-stats';
import moment from 'moment-timezone';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends BaseService {

  constructor(private http: HttpClient,
              private router: Router,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  find(marathonId: string, page: number, size: number): Observable<Page<Donation>> {
    const params = new HttpParams().set('page', String(page)).set('size', String(size));
    return this.http.get<Page<Donation>>(this.url(`${marathonId}/donations`), {
      params: params
    });
  }

  findStats(marathonId: string): Observable<DonationStats> {
    return this.http.get<DonationStats>(this.url(`${marathonId}/donations/stats`));
  }

  donate(marathonId: string, donation: Donation): Observable<any> {
    return this.http.post(this.url(`${marathonId}/donations/donate`), donation, {observe: 'response'});
  }

  cancel(marathonId: string, orderId: string): Observable<any> {
    return this.http.delete(this.url(`${marathonId}/donations/${orderId}`));
  }

  validate(marathonId: string, orderId: string) {
    return this.http.post(this.url(`${marathonId}/donations/validate/${orderId}`), null).subscribe(response => {
      this.translateService.get('alert.donation.validate.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, error => {
      this.translateService.get('alert.donation.validate.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }

  exportAllForMarathon(marathonId: string) {
    const exportUrl = this.url(`${marathonId}/donations/export?zoneId=${moment.tz.guess()}`);
    this.http.get(exportUrl, {responseType: 'text'})
      .subscribe(response => {
          const blob = new Blob([response], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);

          if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, marathonId + '-donations.csv');
          } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = marathonId + '-donations.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          window.URL.revokeObjectURL(url);
        },
        error => {
          this.translateService.get('alert.donation.export.error').subscribe((res: string) => {
            this.toast(res, 3000, 'warning');
          });
        });
  }
}
