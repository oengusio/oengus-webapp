import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { NwbAlertConfig } from '../app/components/wizi/alert/NwbAlertConfig';

export interface NotificationItem {
  message: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private translateService = inject(TranslateService);

  private notifySubject = new Subject<NotificationItem>();
  public notificationObservable = this.notifySubject.asObservable();

  private toastSubject = new Subject<NwbAlertConfig>();
  public observableToastr = this.toastSubject.asObservable();

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

  public toastRaw(message: string, duration = 5000, color = 'success', position = 'right') {
    const alertConfig: NwbAlertConfig = {
      id: crypto.randomUUID(),
      message,
      duration,
      position: `is-${position}`,
      color: `is-${color}`
    };

    return this.toastSubject.next(alertConfig);
  }
}
