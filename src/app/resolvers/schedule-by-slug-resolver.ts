import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { V2Schedule } from '../../model/schedule';

@Injectable()
export class ScheduleBySlugResolver  {
  private scheduleService = inject(ScheduleService);


  resolve(route: ActivatedRouteSnapshot): Observable<V2Schedule> {
    const marathonId = route.parent?.paramMap.get('id');

    if (!marathonId) {
      throw new Error('missing marathon id');
    }

    const slug = route.paramMap.get('slug');

    if (!slug) {
      throw new Error('missing slug in params');
    }

    return this.scheduleService.getBySlug(marathonId, slug);
  }
}
