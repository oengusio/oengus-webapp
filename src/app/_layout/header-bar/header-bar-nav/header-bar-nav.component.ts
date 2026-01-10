import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbCommonModule } from '@oengus/ng-wizi-bulma';
import { faDiscord, faGithub, faMastodon, faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBug, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/user.service';
import { HeaderLanguagePickerComponent } from '../header-language-picker/header-language-picker.component';
import { HeaderBarUserComponent } from '../header-bar-user/header-bar-user.component';
import { ElementLoginLinkSelectorComponent } from '../../../elements/element-login-link-selector/element-login-link-selector.component';

@Component({
    selector: 'app-header-bar-nav',
    templateUrl: './header-bar-nav.component.html',
    styleUrls: ['./header-bar-nav.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        FontAwesomeModule,
        NwbCommonModule,
        HeaderLanguagePickerComponent,
        HeaderBarUserComponent,
        ElementLoginLinkSelectorComponent,
    ]
})
export class HeaderBarNavComponent {
  userService = inject(UserService);


  isNavbarActive = false;

  iconDiscord = faDiscord;
  iconMastodon = faMastodon;
  iconTwitter = faTwitter;
  iconGithub = faGithub;
  iconBug = faBug;
  iconLanguage = faLanguage;
  iconPatreon = faPatreon;

  get isActiveClass() {
    return {
      'is-active': this.isNavbarActive,
    };
  }

  toggleNavbarActive(): void {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
