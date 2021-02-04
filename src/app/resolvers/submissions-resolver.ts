import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Submission } from '../../model/submission';
import { Observable } from 'rxjs';
import { SubmissionService } from '../../services/submission.service';

@Injectable()
export class SubmissionsResolver implements Resolve<Submission[]> {

  constructor(private submissionService: SubmissionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Submission[]> | Promise<Submission[]> | Submission[] {
    return this.submissionService.submissions(route.parent.paramMap.get('id')).toPromise().catch(() => {
      return [];
    });
  }
}
