import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incentive } from '../model/incentive';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class IncentiveService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  getAllForMarathon(marathonId: string, withLocked = true, withUnapproved = true): Observable<Incentive[]> {
    return this.http.get<Incentive[]>(this.url(`${marathonId}/incentives?withLocked=${withLocked}&withUnapproved=${withUnapproved}`));
  }

  saveAll(marathonId: string, incentives: Incentive[]) {
    return this.http.post(this.url(`${marathonId}/incentives`), incentives, {observe: 'response'})
      .subscribe((response: any) => {
        this.translateService.get('alert.incentives.save.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, error => {
        this.translateService.get('alert.incentives.save.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }

  delete(marathonId: string, incentiveId: number) {
    return this.http.delete(this.url(`${marathonId}/incentives/${incentiveId}`))
      .subscribe((response: any) => {
        this.translateService.get('alert.incentives.delete.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, error => {
        this.translateService.get('alert.incentives.delete.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }
}
