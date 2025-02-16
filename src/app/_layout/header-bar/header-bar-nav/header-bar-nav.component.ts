import { Component } from '@angular/core';
import { faDiscord, faGithub, faMastodon, faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBug, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-header-bar-nav',
    templateUrl: './header-bar-nav.component.html',
    styleUrls: ['./header-bar-nav.component.scss'],
    standalone: false
})
export class HeaderBarNavComponent {

  isNavbarActive = false;

  iconDiscord = faDiscord;
  iconMastodon = faMastodon;
  iconTwitter = faTwitter;
  iconGithub = faGithub;
  iconBug = faBug;
  iconLanguage = faLanguage;
  iconPatreon = faPatreon;

  constructor(public userService: UserService) { }

  get isActiveClass() {
    return {
      'is-active': this.isNavbarActive,
    };
  }

  toggleNavbarActive(): void {
    this.isNavbarActive = !this.isNavbarActive;
  }

  get noRedirectPaths(): string[] {
    return [
      '/register',
      '/forgot-password'
    ];
  }

  storeCurrentLocation(): boolean {
    let path = window.location.pathname;

    if (this.noRedirectPaths.includes(path)) {
      path = '/';
    }

    // We store pathname because "403" can be inserted if a user is not logged in
    localStorage.setItem('prev_loc', path);
    return true;
  }
}
