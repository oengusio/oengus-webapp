import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ElementModule } from '../elements/elements.module';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ElementModule,
  ]
})
export class PrivacyPolicyComponent {
  readonly title = 'Privacy Policy';
}
