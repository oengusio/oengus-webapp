import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MarathonService } from '../../services/marathon.service';
import { SelfUser } from '../../model/user';
import { Marathon } from '../../model/marathon';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateMarathonSettingsGuard  {
  private userService = inject(UserService);
  private marathonService = inject(MarathonService);


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (!this.userService.user && !this.marathonService.marathon) {
      const checkObservable = forkJoin([
        this.userService.getMe(),
        this.marathonService.find(route.parent.paramMap.get('id')),
      ])
        .pipe(
          map(([user, marathon]) => this.condition(user, marathon)),
          catchError(err => of(false)),
        );

      return firstValueFrom(checkObservable);
    }

    return this.condition(this.userService.user, this.marathonService.marathon);
  }

  private condition(user: SelfUser, marathon: Marathon) {
    return !!user && !user.roles.includes('ROLE_BANNED') &&
      (marathon.creator.id === user.id ||
        marathon.moderators.findIndex(u => u.id === user.id) >= 0 ||
        user.roles.includes('ROLE_ADMIN'));
  }
}

export const canActivateMarathonSettingsGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateMarathonSettingsGuard).canActivate(route, state);
};
