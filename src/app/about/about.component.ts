import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutInfoComponent } from './about-info/about-info.component';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { AboutPrivacyComponent } from './about-privacy/about-privacy.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    imports: [
        CommonModule,
        AboutInfoComponent,
        AboutContactComponent,
        AboutPrivacyComponent,
    ]
})
export class AboutComponent {
  readonly title = 'About';

}
