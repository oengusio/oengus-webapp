import { Component, Input } from '@angular/core';
import { User } from '../../../model/user';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent {
  @Input() user: User;
  @Input() username = '';
  @Input() isLink = false;

  constructor(private temporal: TemporalServiceService) { }

  get userId(): string {
    return this.user?.username ?? this.user.toString();
  }

  get displayName(): string {
    // TODO: hack
    if (this.user?.usernameJapanese && this.temporal.locale.startsWith('ja')) {
      return this.user.usernameJapanese;
    }
    return this.userId;
  }

}
