import { Component, Input } from '@angular/core';
import { User } from '../../../model/user';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent {
  @Input() user: User;
  @Input() username = '';
  @Input() target = '_self';
  @Input() isLink = false;
  @Input() showAvatar = false;

  get userId(): string {
    return this.user?.username ?? this.username;
  }

  get avatarUrl(): string {
    return `${environment.api}/v2/users/${this.userId}/avatar`;
  }

  get displayName(): string {
    return this?.user?.displayName ?? this.username;
  }

}
