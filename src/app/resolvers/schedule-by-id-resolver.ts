import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleInfo } from '../../model/schedule';

@Injectable()
export class ScheduleByIdResolver  {
  private scheduleService = inject(ScheduleService);


  resolve(route: ActivatedRouteSnapshot):
    Observable<ScheduleInfo> | Promise<ScheduleInfo> | ScheduleInfo {
    const scheduleId = parseInt(route.paramMap.get('scheduleId') ?? '0', 10);
    const marathonId = route.parent?.paramMap.get('id');

    if (!marathonId) {
      throw new Error('Missing marathon id in params');
    }

    return this.scheduleService.getInfoByIdManagement(marathonId, scheduleId);
  }
}
