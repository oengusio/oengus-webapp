import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleInfo } from '../../model/schedule';

@Injectable()
export class ScheduleOverviewResolver  {
  private scheduleService = inject(ScheduleService);


  resolve(route: ActivatedRouteSnapshot):
    Observable<ScheduleInfo[]> | Promise<ScheduleInfo[]> | ScheduleInfo[] {
    const marathonId = route.parent.paramMap.get('id');

    return this.scheduleService.getAllOverviewManagement(marathonId);
  }
}
