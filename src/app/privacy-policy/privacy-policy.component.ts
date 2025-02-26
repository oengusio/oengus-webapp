import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  standalone: false,
})
export class PrivacyPolicyComponent {
  get title(): string {
    return 'Privacy Policy';
  }
}
