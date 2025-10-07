import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IncentiveService } from '../../services/incentive.service';
import { Incentive } from '../../model/incentive';

@Injectable()
export class IncentivesResolver  {
  private incentiveService = inject(IncentiveService);


  resolve(route: ActivatedRouteSnapshot): Observable<Incentive[]> | Promise<Incentive[]> | Incentive[] {
    return this.incentiveService.getAllForMarathon(route.parent.paramMap.get('id'), route.data['withLocked'], route.data['withUnapproved']);
  }
}
