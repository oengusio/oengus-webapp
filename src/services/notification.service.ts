import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: NwbAlertService, private translateService: TranslateService) {}

  public notify() {
    // TODO: this will display a 'notification' to the user in the form of a bulma message component.
    //  Should be used to tell the user that something major has fucked up.
  }

  public toast(translateKey: string, duration: number = 3000, color: string = 'success') {
    firstValueFrom(this.translateService.get(translateKey)).then((message) => {
      this.toastRaw(message, duration, color);
    });
  }

  public toastRaw(message: string, duration: number = 3000, color: string = 'success') {
    const alertConfig: NwbAlertConfig = {
      message,
      duration,
      position: 'is-right',
      color: `is-${color}`
    };

    return this.toastr.open(alertConfig);
  }
}
