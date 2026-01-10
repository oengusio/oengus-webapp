import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-info',
    templateUrl: './about-info.component.html',
    styleUrls: ['./about-info.component.scss'],
    host: {
        class: 'box',
    },
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class AboutInfoComponent {
}
