import { ResolveFn } from '@angular/router';
import { MarathonSettings } from '../../model/marathon';
import { inject } from '@angular/core';
import { MarathonService } from '../../services/marathon.service';

export const marathonSettingsResolverResolver: ResolveFn<MarathonSettings> = (route) => {
  const marathonService = inject(MarathonService);

  return marathonService.loadSettings(route.parent.paramMap.get('id'));
};
