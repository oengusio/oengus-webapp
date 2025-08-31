import { Component } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { version } from '../../../../../package.json';

@Component({
    selector: 'app-footer-bar',
    templateUrl: './footer-bar.component.html',
    styleUrls: ['./footer-bar.component.scss'],
    standalone: false
})
export class FooterBarComponent {

  constructor(public temporal: TemporalServiceService) { }

  protected version = version;

  get thisYear(): number {
    return new Date().getFullYear();
  }

}
