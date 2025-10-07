import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { DonationStats } from '../../model/donation-stats';

@Injectable()
export class DonationsStatsResolver  {
  private donationService = inject(DonationService);


  resolve(route: ActivatedRouteSnapshot):
    Observable<DonationStats> | Promise<DonationStats> | DonationStats {
    return this.donationService.findStats(route.parent.paramMap.get('id'));
  }
}
