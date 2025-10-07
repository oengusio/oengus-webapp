import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MarathonService } from '../../services/marathon.service';
import { Marathon } from '../../model/marathon';
import { UserService } from '../../services/user.service';

@Injectable()
export class HomepageModeratedResolver  {
  private marathonService = inject(MarathonService);
  private userService = inject(UserService);


  async resolve(): Promise<Marathon[]> {
    if (!this.userService.token) {
      return [];
    }

    try {
      const data = await firstValueFrom(this.marathonService.findHomepageModerated());

      return data.marathons;
    } catch {
      return [];
    }
  }
}
