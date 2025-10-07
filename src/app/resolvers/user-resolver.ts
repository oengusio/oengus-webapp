import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelfUser } from '../../model/user';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserResolver  {
  private userService = inject(UserService);


  resolve(): Observable<SelfUser> | Promise<SelfUser> | SelfUser {
    return this.userService.getMe();
  }
}
