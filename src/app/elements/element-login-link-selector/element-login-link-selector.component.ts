import { Component, HostListener } from '@angular/core';

@Component({
  selector: '[login-link]',
  imports: [],
  template: '<ng-content></ng-content>',
})
export class ElementLoginLinkSelectorComponent {
  @HostListener('click')
  onLinkClicked(): boolean {
    return this.storeCurrentLocation();
  }

  get noRedirectPaths(): string[] {
    return [
      '/login',
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
    return false;
  }
}
