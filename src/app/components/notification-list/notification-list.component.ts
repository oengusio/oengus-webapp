import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
  standalone: false,
})
export class NotificationListComponent {
  public notifications: Array<{
    message: string;
    color: string;
  }> = [];

  constructor(notificationService: NotificationService) {
    notificationService.notificationObservable.subscribe(({ message, color }) => {
      this.notifications.push({
        message,
        color,
      });
    });
  }

  deleteNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}
