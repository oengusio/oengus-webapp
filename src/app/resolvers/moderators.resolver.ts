import { ResolveFn } from '@angular/router';
import { UserProfile } from '../../model/user-profile';
import { inject } from '@angular/core';
import { MarathonService } from '../../services/marathon.service';
import { map } from 'rxjs/operators';

export const moderatorsResolver: ResolveFn<UserProfile[]> = (route) => {
  const marathonService = inject(MarathonService);

  return marathonService.loadModerators(route.parent.paramMap.get('id'))
    .pipe(map(x => x.data));
};
