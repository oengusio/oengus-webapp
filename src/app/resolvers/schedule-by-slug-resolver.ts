import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { V2Schedule } from '../../model/schedule';

@Injectable()
export class ScheduleBySlugResolver  {
  private scheduleService = inject(ScheduleService);


  resolve(route: ActivatedRouteSnapshot): Observable<V2Schedule> {
    return this.scheduleService.getBySlug(
      route.parent.paramMap.get('id'),
      route.paramMap.get('slug')
    );
  }
}
