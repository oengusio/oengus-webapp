import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Selection } from '../model/selection';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class SelectionService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  getAllForMarathon(marathonId: string, statuses = []): Observable<Map<number, Selection>> {
    const params = new HttpParams().set('status', statuses.join(','));
    return this.http.get<Map<number, Selection>>(this.url(`${marathonId}/selections`), {params: params});
  }

  save(marathonId: string, selection: Selection[]) {
    return this.http.put(this.url(`${marathonId}/selections`), selection).subscribe((response: any) => {
      this.translateService.get('alert.selection.save.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, error => {
      this.translateService.get('alert.selection.save.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }
}
