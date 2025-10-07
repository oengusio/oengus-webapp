import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarathonService } from '../../services/marathon.service';
import { HomepageMetadata } from '../../model/homepage-metadata';

@Injectable()
export class HomepageMetadataResolver  {
  private marathonService = inject(MarathonService);


  resolve():
    Observable<HomepageMetadata> | Promise<HomepageMetadata> | HomepageMetadata {
    return this.marathonService.findHomepageMetadata();
  }
}
