import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-popup',
  templateUrl: './security-popup.component.html',
  styleUrl: './security-popup.component.scss',
  imports: [
    CommonModule,
  ]
})
export class SecurityPopupComponent implements OnInit {
  open = true;

  ngOnInit(): void {
    // Check for cookie and force popup closed

    this.open = !document.cookie.includes('popup_closed=true');

    // Force cookie as the date gets fucked somehow
    if (!this.open) {
      this.setCookie();
    }
  }

  closePopup() {
    this.open = false;
    this.setCookie();
  }

  private setCookie() {
    const expDate = new Date(2026, 0, 1, 11, 0, 0);

    document.cookie = `popup_closed=true; expires=${expDate.toUTCString()}; Path=/; SameSite=Strict`;
  }
}
