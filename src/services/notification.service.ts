import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

export interface NotificationItem {
  message: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(NwbAlertService);
  private translateService = inject(TranslateService);

  private notifySubject = new Subject<NotificationItem>();
  public notificationObservable = this.notifySubject.asObservable();

  public notify(translateKey: string, color = 'success') {
    firstValueFrom(this.translateService.get(translateKey)).then((message) => {
      this.notifyRw(message, color);
    });
  }

  public notifyRw(message: string, color = 'success') {
    this.notifySubject.next({ message, color });
  }

  public toast(translateKey: string, duration = 3000, color = 'success') {
    firstValueFrom(this.translateService.get(translateKey)).then((message) => {
      this.toastRaw(message, duration, color);
    });

    // const message = this.translateService.instant(translateKey);

    // return this.toastRaw(message, duration, color);
  }

  public toastRaw(message: string, duration = 3000, color = 'success') {
    const alertConfig: NwbAlertConfig = {
      message,
      duration,
      position: 'is-right',
      color: `is-${color}`
    };

    return this.toastr.open(alertConfig);
  }
}
