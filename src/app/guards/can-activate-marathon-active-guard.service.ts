import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { MarathonService } from '../../services/marathon.service';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanActivateMarathonActiveGuard {
  private marathonService = inject(MarathonService);


  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    if (!this.marathonService.marathon) {
      const findObservable = this.marathonService.find(route.parent.paramMap.get('id'))
        .pipe(
          map((marathon) => {
            return !this.marathonService.isArchived(marathon);
          }),
        );

      return firstValueFrom(findObservable);
    }

    return !this.marathonService.isArchived();
  }
}

export const canActivateMarathonActiveGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateMarathonActiveGuard).canActivate(route, state);
};
