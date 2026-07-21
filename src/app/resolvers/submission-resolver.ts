import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Submission } from '../../model/submission';
import { SubmissionService } from '../../services/submission.service';

@Injectable()
export class SubmissionResolver  {
  private submissionService = inject(SubmissionService);

  async resolve(route: ActivatedRouteSnapshot): Promise<Submission | null> {
    const marathonId = route.parent?.paramMap.get('id');

    if (!marathonId) {
      throw new Error('no marathon id in path');
    }

    const submission = await this.submissionService.mine(marathonId);

    return submission;
  }
}
