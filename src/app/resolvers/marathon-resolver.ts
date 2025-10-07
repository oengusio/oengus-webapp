import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Marathon } from '../../model/marathon';
import { Observable } from 'rxjs';
import { MarathonService } from '../../services/marathon.service';

@Injectable()
export class MarathonResolver  {
  private marathonService = inject(MarathonService);


  resolve(route: ActivatedRouteSnapshot):
    Observable<Marathon> | Promise<Marathon> | Marathon {
    return this.marathonService.find(route.paramMap.get('id'));
  }
}
