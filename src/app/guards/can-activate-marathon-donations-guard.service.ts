import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateMarathonDonationsGuard  {
  // private marathonService = inject(MarathonService);

  // canActivate(route: ActivatedRouteSnapshot):
  canActivate():
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*if (!this.marathonService.marathon) {
      return new Promise<boolean>((resolve) => {
        resolve(this.marathonService.find(route.parent.paramMap.get('id')).pipe(
          map((marathon) => !!marathon.hasDonations && !!marathon.donationsOpen)
        ).toPromise());
      });
    }
    return !!this.marathonService.marathon.hasDonations && !!this.marathonService.marathon.donationsOpen;*/

    return false;
  }
}
