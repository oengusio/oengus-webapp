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

  get userId(): string {
    return this.user?.username ?? this.username;
  }

  get displayName(): string {
    return this?.user?.displayName ?? this.username;
  }

}
