import { Component, Input } from '@angular/core';
import { BasicUserInfo } from '../../../model/user';
import { environment } from '../../../environments/environment';
import { LineRunner } from '../../../model/schedule-line';

@Component({
    selector: 'app-user-link',
    templateUrl: './user-link.component.html',
    styleUrls: ['./user-link.component.scss'],
    standalone: false
})
export class UserLinkComponent {
  @Input() user: BasicUserInfo | LineRunner;
  @Input() username = '';
  @Input() target = '_self';
  @Input() isLink = false;
  @Input() showAvatar = false;

  get userId(): string {
    // @ts-expect-error I need to fix the type checks here.
    return this?.user?.username ?? this?.user?.profile?.username ?? this.username;
  }

  get avatarUrl(): string {
    return `${environment.api}/v2/users/${this.userId}/avatar`;
  }

  get displayName(): string {
    // @ts-expect-error I need to fix the type checks here.
    return this?.user?.displayName ?? this?.user?.profile?.displayName ?? this?.user?.runnerName ?? this.username;
  }

}
