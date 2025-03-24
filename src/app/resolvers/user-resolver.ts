import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SelfUser } from '../../model/user';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserResolver  {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SelfUser> | Promise<SelfUser> | SelfUser {
    return this.userService.getMe();
  }
}
