import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../../model/user-profile';
import { BoxComponent } from './box/box.component';

@Component({
    selector: 'app-user-social',
    templateUrl: './user-social.component.html',
    styleUrls: ['./user-social.component.scss'],
    imports: [
        CommonModule,
        BoxComponent,
    ]
})
export class UserSocialComponent {
  @Input() user: UserProfile;
}
