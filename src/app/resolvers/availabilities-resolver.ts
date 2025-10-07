import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SubmissionService } from '../../services/submission.service';
import { AvailabilityResponse } from '../../model/availability';

@Injectable()
export class AvailabilitiesResolver  {
  private submissionService = inject(SubmissionService);


  resolve(route: ActivatedRouteSnapshot): Observable<AvailabilityResponse> | Promise<AvailabilityResponse> | AvailabilityResponse {
    return this.submissionService.availabilities(route.parent.paramMap.get('id'));
  }
}
