import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../model/user-profile';

@Injectable()
export class UserProfileResolver  {
  private userService = inject(UserService);


  resolve(route: ActivatedRouteSnapshot): Observable<UserProfile> | Promise<UserProfile> | UserProfile {
    const name = route.paramMap.get('name')?.toLowerCase();

    if (!name) {
      throw new Error('name not in params');
    }

    return this.userService.getProfile(name);
  }
}
