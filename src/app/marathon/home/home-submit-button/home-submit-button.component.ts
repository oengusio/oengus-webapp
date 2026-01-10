import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { Marathon } from '../../../../model/marathon';
import { UserService } from '../../../../services/user.service';
import { MarathonService } from '../../../../services/marathon.service';
import { ElementLoginLinkSelectorComponent } from '../../../elements/element-login-link-selector/element-login-link-selector.component';

@Component({
    selector: 'app-home-submit-button',
    templateUrl: './home-submit-button.component.html',
    styleUrls: ['./home-submit-button.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementLoginLinkSelectorComponent,
    ]
})
export class HomeSubmitButtonComponent {
  private userService = inject(UserService);
  private marathonService = inject(MarathonService);

  @Input() marathon: Marathon;

  get loggedIn(): boolean {
    return !!this.userService.user;
  }

  get archived(): boolean {
    return this.marathonService.isArchived();
  }
}
