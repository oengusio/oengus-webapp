import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { UserService } from '../../../../services/user.service';
import { SelfUser } from '../../../../model/user';
import { ElementModule } from '../../../elements/elements.module';

@Component({
    selector: 'app-header-bar-user',
    templateUrl: './header-bar-user.component.html',
    styleUrls: ['./header-bar-user.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementModule,
    ]
})
export class HeaderBarUserComponent {
  userService = inject(UserService);

  get user(): SelfUser {
    return this.userService.user;
  }
}
