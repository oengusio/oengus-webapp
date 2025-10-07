import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../model/user-profile';

@Injectable()
export class UserProfileResolver  {
  private userService = inject(UserService);


  resolve(route: ActivatedRouteSnapshot): Observable<UserProfile> | Promise<UserProfile> | UserProfile {
    return this.userService.getProfile(route.paramMap.get('name').toLowerCase());
  }
}
