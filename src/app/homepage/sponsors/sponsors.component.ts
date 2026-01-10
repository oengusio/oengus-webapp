import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ElementModule } from '../../elements/elements.module';

@Component({
    selector: 'app-homepage-sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls: ['./sponsors.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ElementModule,
    ]
})
export class SponsorsComponent {
}
