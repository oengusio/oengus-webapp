import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-privacy',
    templateUrl: './about-privacy.component.html',
    styleUrls: ['./about-privacy.component.scss'],
    host: {
        class: 'box',
        id: 'privacy-section',
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
    ]
})
export class AboutPrivacyComponent {
}
