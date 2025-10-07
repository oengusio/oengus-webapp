import { Injectable, inject } from '@angular/core';
import { Submission } from '../model/submission';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './BaseService';
import { Answer } from '../model/answer';
import { SubmissionPage } from '../model/submission-page';
import { AvailabilityResponse } from '../model/availability';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService extends BaseService {
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);


  constructor() {
    const toastr = inject(NwbAlertService);

    super(toastr, 'marathons');
  }

  async mine(marathonId: string): Promise<Submission> {
    try {
      return await firstValueFrom(this.http.get<Submission>(this.url(`${marathonId}/submissions/me`)));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.status === 404) {
        return null;
      }

      throw e;
    }
  }

  availabilities(marathonId: string): Observable<AvailabilityResponse> {
    return this.http.get<AvailabilityResponse>(this.url(`${marathonId}/submissions/availabilities`));
  }

  submissions(marathonId: string, page: number): Observable<SubmissionPage> {
    return this.http.get<SubmissionPage>(this.url(`${marathonId}/submissions?page=${page}`));
  }

  // transform parameter allows us to transform smaller batches at once
  loadAllSubmissions(marathonId: string, transform = (page: Submission[]) => page): Promise<Submission[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Submission[]>(async (resolve, reject) => {
      let page = 1;
      let hasMore = true;
      const allSubmissions: Submission[] = [];

      while (hasMore) {
        try {
          const fetched = await firstValueFrom(
            this.http.get<SubmissionPage>(this.url(`${marathonId}/submissions?page=${page}`))
          );

          hasMore = !fetched.empty && !fetched.last;

          if (!fetched.empty) {
            const transformed = transform(fetched.content);

            allSubmissions.push(...transformed);
          }

          page++;
        } catch (e) {
          reject(e);
          return;
        }
      }

      resolve(allSubmissions);
    });
  }

  searchSubmissions(marathonId: string, query: string, status?: string, page = 1): Observable<SubmissionPage> {
    const params: { q: string; page: number; status?: string; } = {
      q: query,
      page,
    };

    if (status) {
      params.status = status;
    }

    return this.http.get<SubmissionPage>(this.url(`${marathonId}/submissions/search`), {
      params,
    });
  }

  answers(marathonId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.url(`${marathonId}/submissions/answers`));
  }

  availabilitiesForUser(marathonId: string, userId: number): Observable<AvailabilityResponse> {
    return this.http.get<AvailabilityResponse>(this.url(`${marathonId}/submissions/availabilities/${userId}`));
  }

  create(marathonId: string, submission: Submission) {
    return this.http
      .post(this.url(`${marathonId}/submissions`), submission, {observe: 'response'})
      .subscribe(() => {
        this.translateService.get('alert.submission.save.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, () => {
        this.translateService.get('alert.submission.save.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }

  update(marathonId: string, submission: Submission) {
    return this.http
      .put(this.url(`${marathonId}/submissions`), submission, {observe: 'response'})
      .subscribe(() => {
        this.translateService.get('alert.submission.save.success').subscribe((res: string) => {
          this.toast(res);
        });
      }, () => {
        this.translateService.get('alert.submission.save.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      });
  }

  delete(marathonId: string, submissionId: number, callback?) {
    return this.http.delete(this.url(`${marathonId}/submissions/${submissionId}`)).subscribe({
      next: () => {
        this.translateService.get('alert.submission.deletion.success').subscribe((res: string) => {
          this.toast(res);
          if (callback) {
            callback();
          }
        });
      },
      error: () => {
        this.translateService.get('alert.submission.deletion.error').subscribe((res: string) => {
          this.toast(res, 3000, 'warning');
        });
      },
    });
  }

}
