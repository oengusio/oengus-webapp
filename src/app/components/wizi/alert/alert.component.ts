import { NwbAlertConfig } from './NwbAlertConfig';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-nwb-alerts',
  templateUrl: './alert.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class NwbAlertComponent {
  protected configs: (NwbAlertConfig & { open: boolean })[] = [];

  constructor() {
    const notificationService = inject(NotificationService);

    notificationService.observableToastr.subscribe((config) => {
      const newLength = this.configs.push({
        ...config,
        open: false,
      });

      setTimeout(() => {
        this.configs[newLength - 1].open = true;
      }, 50);

      if (config.duration) {
        setTimeout(() => this.dismiss(config.id), config.duration);
      }
    });
  }

  dismiss(itemId: string) {
    const idx = this.configs.findIndex((a) => a.id === itemId);

    if (idx === -1) {
      return;
    }

    this.configs[idx].open = false;

    setTimeout(() => {
      this.configs.splice(idx, 1);
    }, 200);
  }
}
