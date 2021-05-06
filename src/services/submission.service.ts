import { Injectable } from '@angular/core';
import { Submission } from '../model/submission';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService extends BaseService {

  constructor(private http: HttpClient,
              toastr: NwbAlertService,
              private translateService: TranslateService) {
    super(toastr, 'marathons');
  }

  mine(marathonId: string): Observable<Submission> {
    return this.http.get<Submission>(this.url(`${marathonId}/submissions/me`));
  }

  availabilities(marathonId: string): Observable<any> {
    return this.http.get<any>(this.url(`${marathonId}/submissions/availabilities`));
  }

  submissions(marathonId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.url(`${marathonId}/submissions`));
  }

  answers(marathonId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.url(`${marathonId}/submissions/answers`));
  }

  availabilitiesForUser(marathonId: string, userId: number): Observable<any> {
    return this.http.get<any>(this.url(`${marathonId}/submissions/availabilities/${userId}`));
  }

  create(marathonId: string, submission: Submission) {
    return this.http
      .post(this.url(`${marathonId}/submissions`), submission, {observe: 'response'})
      .subscribe((response: any) => {
        this.translateService.get('alert.submission.save.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, error => {
        this.translateService.get('alert.submission.save.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }

  update(marathonId: string, submission: Submission) {
    return this.http
      .put(this.url(`${marathonId}/submissions`), submission, {observe: 'response'})
      .subscribe((response: any) => {
        this.translateService.get('alert.submission.save.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, error => {
        this.translateService.get('alert.submission.save.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }

  delete(marathonId: string, submissionId: number, callback?) {
    return this.http.delete(this.url(`${marathonId}/submissions/${submissionId}`)).subscribe(response => {
      this.translateService.get('alert.submission.deletion.success').subscribe((res: string) => {
        this.toast(res);
        if (callback) {
          callback();
        }
      });
    }, error => {
      this.translateService.get('alert.submission.deletion.error').subscribe((res: string) => {
        this.toast(res, 3000, 'warning');
      });
    });
  }

}
