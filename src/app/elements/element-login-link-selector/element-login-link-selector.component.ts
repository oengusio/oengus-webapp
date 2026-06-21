import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[login-link]',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
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
