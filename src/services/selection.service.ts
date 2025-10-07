import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Selection } from '../model/selection';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class SelectionService extends BaseService {
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);


  constructor() {
    const toastr = inject(NwbAlertService);

    super(toastr, 'marathons');
  }

  getAllForMarathon(marathonId: string, statuses = []): Observable<Map<number, Selection>> {
    const params = new HttpParams().set('status', statuses.join(','));
    return this.http.get<Map<number, Selection>>(this.url(`${marathonId}/selections`), {params: params});
  }

  getAllForMarathonAdmin(marathonId: string, statuses = []): Observable<Map<number, Selection>> {
    const params = new HttpParams().set('status', statuses.join(','));
    return this.http.get<Map<number, Selection>>(this.url(`${marathonId}/selections/admin`), { params: params });
  }

  save(marathonId: string, selection: Selection[]) {
    return this.http.put(this.url(`${marathonId}/selections`), selection).subscribe(() => {
      this.translateService.get('alert.selection.save.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, () => {
      this.translateService.get('alert.selection.save.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }
}
