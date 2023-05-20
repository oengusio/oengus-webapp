import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub, faMastodon, faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBug, faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-bar-nav',
  templateUrl: './header-bar-nav.component.html',
  styleUrls: ['./header-bar-nav.component.scss']
})
export class HeaderBarNavComponent implements OnInit {

  isNavbarActive = false;

  iconDiscord = faDiscord;
  iconMastodon = faMastodon;
  iconTwitter = faTwitter;
  iconGithub = faGithub;
  iconBug = faBug;
  iconLanguage = faLanguage;
  iconPatreon = faPatreon;

  constructor() { }

  ngOnInit(): void {
  }

  get isActiveClass() {
    return {
      'is-active': this.isNavbarActive,
    };
  }

  toggleNavbarActive(): void {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
