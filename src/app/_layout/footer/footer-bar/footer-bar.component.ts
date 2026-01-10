import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { version } from '../../../../../package.json';
import { FooterPatronsComponent } from '../footer-patrons/footer-patrons.component';

@Component({
    selector: 'app-footer-bar',
    templateUrl: './footer-bar.component.html',
    styleUrls: ['./footer-bar.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FooterPatronsComponent,
    ]
})
export class FooterBarComponent {
  temporal = inject(TemporalServiceService);


  protected version = version;

  get thisYear(): number {
    return new Date().getFullYear();
  }

}
