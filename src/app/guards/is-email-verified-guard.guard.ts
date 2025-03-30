import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsEmailVerifiedGuardGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.userService.user?.emailVerified || false;
  }
}

export const isEmailVerifiedGuardGuard: CanActivateFn = (route, state) => {
  return inject(IsEmailVerifiedGuardGuard).canActivate(route, state);
};
