import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Submission } from '../../model/submission';
import { Observable } from 'rxjs';
import { SubmissionService } from '../../services/submission.service';

@Injectable()
export class SubmissionResolver  {
  private submissionService = inject(SubmissionService);


  resolve(route: ActivatedRouteSnapshot): Observable<Submission> | Promise<Submission> | Submission {
    return this.submissionService.mine(route.parent.paramMap.get('id'));
  }
}
