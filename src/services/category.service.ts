import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Opponent } from '../model/opponent';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  getFromCode(marathonId: string, code: string): Observable<Opponent> {
    return this.http.get<Opponent>(this.url(`${marathonId}/categories/${code}`));
  }

  delete(marathonId: string, submissionId: number) {
    return this.http.delete(this.url(`${marathonId}/categories/${submissionId}`)).subscribe(response => {
      this.translateService.get('alert.category.deletion.success').subscribe((res: string) => {
        this.toast(res);
      });
    }, error => {
      this.translateService.get('alert.category.deletion.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }
}
