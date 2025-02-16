import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-header-bar-cookies',
    templateUrl: './header-bar-cookies.component.html',
    styleUrls: ['./header-bar-cookies.component.scss'],
    host: {
        class: 'box has-background-dark',
    },
    standalone: false
})
export class HeaderBarCookiesComponent implements OnInit {
  @Output() visibilityUpdated = new EventEmitter<boolean>();
  showConsentPrompt = true;

  private gtagIds = [
    'G-26CN947SSZ',
    'UA-153189507-4',
    'GTM-KK8K7V8',
  ];

  // disable google analytics if consent is not given
  ngOnInit(): void {
    let showConsentPrompt = true;
    // doNotTrack is deprecated, let's not break if it gets removed
    showConsentPrompt &&= navigator?.doNotTrack !== '1';
    showConsentPrompt &&= localStorage.getItem('consent') === null;
    this.showConsentPrompt = showConsentPrompt;

    // Emit the event a bit later to make sure angular does not get mad.
    requestAnimationFrame(() => {
      this.visibilityUpdated.emit(showConsentPrompt);
    });
  }

  setCookies(consent: boolean): void {
    // We invert for these, because these are DISABLE flags. Consent: yes; disable: no
    this.gtagIds.forEach((id) => { window[`ga-disable-${id}`] = !consent; });

    localStorage.setItem('consent', consent.toString());

    this.showConsentPrompt = false;
    this.visibilityUpdated.emit(false);
  }

}
