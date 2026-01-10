import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-contact',
    templateUrl: './about-contact.component.html',
    styleUrls: ['./about-contact.component.scss'],
    host: {
        class: 'box',
    },
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class AboutContactComponent {
}
