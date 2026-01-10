import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownPipe,
  ]
})
export class NotificationListComponent {
  public notifications: {
    message: string;
    color: string;
  }[] = [];

  constructor() {
    const notificationService = inject(NotificationService);

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
