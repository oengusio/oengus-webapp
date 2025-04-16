import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsEmailVerifiedGuardGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GuardResult> {
    if (!this.userService.user) {
      const currentUser = await firstValueFrom(this.userService.getMe());

      return currentUser.emailVerified;
    }

    return this.userService.user.emailVerified || false;
  }
}

export const isEmailVerifiedGuardGuard: CanActivateFn = (route, state) => {
  return inject(IsEmailVerifiedGuardGuard).canActivate(route, state);
};
