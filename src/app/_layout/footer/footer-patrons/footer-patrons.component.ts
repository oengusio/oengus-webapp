import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ElementModule } from '../../../elements/elements.module';
import { ComponentsModule } from '../../../components/components.module';

@Component({
    selector: 'app-footer-patrons',
    templateUrl: './footer-patrons.component.html',
    styleUrls: ['./footer-patrons.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ElementModule,
        ComponentsModule,
    ]
})
export class FooterPatronsComponent {
}
