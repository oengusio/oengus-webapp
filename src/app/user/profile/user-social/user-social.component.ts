import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../../model/user-profile';
import { BoxComponent } from './box/box.component';

@Component({
    selector: 'app-user-social',
    templateUrl: './user-social.component.html',
    styleUrls: ['./user-social.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        BoxComponent,
    ]
})
export class UserSocialComponent {
  // @ts-expect-error meh.
  @Input() user: UserProfile;
}
