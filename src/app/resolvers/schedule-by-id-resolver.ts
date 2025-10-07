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
    const scheduleId = parseInt(route.paramMap.get('scheduleId'), 10);

    return this.scheduleService.getInfoByIdManagement(route.parent.paramMap.get('id'), scheduleId);
  }
}
