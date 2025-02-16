import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-security-popup',
    templateUrl: './security-popup.component.html',
    styleUrl: './security-popup.component.scss',
    standalone: false
})
export class SecurityPopupComponent implements OnInit {
  open = true;

  ngOnInit(): void {
    // Check for cookie and force popup closed

    this.open = !document.cookie.includes('popup_closed=true');
  }

  closePopup() {
    this.open = false;
    document.cookie = 'popup_closed=true; expires=Thu, 01 Jan 2026 00:00:00 UTC; SameSite=Strict';
  }
}
