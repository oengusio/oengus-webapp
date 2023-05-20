import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar-cookies',
  templateUrl: './header-bar-cookies.component.html',
  styleUrls: ['./header-bar-cookies.component.scss'],
  host: {
    class: 'box has-background-dark',
  },
})
export class HeaderBarCookiesComponent implements OnInit {

  showConsentPrompt = true;

  constructor() { }

  // disable google analytics if consent is not given
  ngOnInit(): void {
    let showConsentPrompt = true;
    // doNotTrack is deprecated, let's not break if it gets removed
    showConsentPrompt &&= navigator?.doNotTrack !== '1';
    showConsentPrompt &&= localStorage.getItem('consent') === null;
    this.showConsentPrompt = showConsentPrompt;
  }

  setCookies(consent: boolean): void {
    // We invert for these, because these are DISABLE flags. Consent: yes; disable: no
    window['getGTagIds']().forEach((id) => { window[`ga-disable-${id}`] = !consent; });

    localStorage.setItem('consent', consent.toString());

    this.showConsentPrompt = false;
  }

}
