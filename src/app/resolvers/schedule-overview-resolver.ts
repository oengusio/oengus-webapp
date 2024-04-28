import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleInfo } from '../../model/schedule';
import { map } from 'rxjs/operators';

@Injectable()
export class ScheduleOverviewResolver implements Resolve<Array<ScheduleInfo>> {

  constructor(private scheduleService: ScheduleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Array<ScheduleInfo>> | Promise<Array<ScheduleInfo>> | Array<ScheduleInfo> {
    const marathonId = route.parent.paramMap.get('id');

    return this.scheduleService.getAllOverview(marathonId).pipe(
      map((res) => res.data)
    );
  }
}
