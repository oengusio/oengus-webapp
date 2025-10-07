import { CanActivate, CanActivateFn, GuardResult } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsEmailVerifiedGuardGuard implements CanActivate {
  private userService = inject(UserService);


  async canActivate(): Promise<GuardResult> {
    if (!this.userService.user) {
      const currentUser = await firstValueFrom(this.userService.getMe());

      return currentUser.emailVerified;
    }

    return this.userService.user.emailVerified || false;
  }
}

export const isEmailVerifiedGuardGuard: CanActivateFn = () => {
  return inject(IsEmailVerifiedGuardGuard).canActivate();
};
