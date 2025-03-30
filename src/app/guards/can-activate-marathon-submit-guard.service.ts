import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { MarathonService } from '../../services/marathon.service';
import { SelfUser } from '../../model/user';
import { Marathon } from '../../model/marathon';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateMarathonSubmitGuard  {

  constructor(private userService: UserService,
              private marathonService: MarathonService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (!this.userService.token) {
      return this.router.navigate(['/403'], { skipLocationChange: true });
    }

    if (!this.userService.user && !this.marathonService.marathon) {
      return new Promise<boolean>((resolve, reject) => {
        resolve(
          firstValueFrom(
            forkJoin([this.userService.getMe(), this.marathonService.find(route.parent.paramMap.get('id'))]).pipe(
              map(([user, marathon]) => {
                return this.condition(user, marathon);
              }),
              catchError(() => of(false))
            )
          )
        );
      });
    }
    return this.condition(this.userService.user, this.marathonService.marathon);
  }

  private condition(user: SelfUser, marathon: Marathon) {
    return marathon.canEditSubmissions && user !== null && !this.userService.isBanned();
  }
}

export const canActivateMarathonSubmitGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateMarathonSubmitGuard).canActivate(route, state);
};
