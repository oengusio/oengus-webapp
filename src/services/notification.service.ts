import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

export interface NotificationItem {
  message: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifySubject = new Subject<NotificationItem>();
  public notificationObservable = this.notifySubject.asObservable();

  constructor(private toastr: NwbAlertService, private translateService: TranslateService) {}

  public notify(translateKey: string, color: string = 'success') {
    firstValueFrom(this.translateService.get(translateKey)).then((message) => {
      this.notifyRw(message, color);
    });
  }

  public notifyRw(message: string, color: string = 'success') {
    this.notifySubject.next({ message, color });
  }

  public toast(translateKey: string, duration: number = 3000, color: string = 'success') {
    firstValueFrom(this.translateService.get(translateKey)).then((message) => {
      this.toastRaw(message, duration, color);
    });

    // const message = this.translateService.instant(translateKey);

    // return this.toastRaw(message, duration, color);
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
