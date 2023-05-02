import { Component } from '@angular/core';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent {

  constructor(public temporal: TemporalServiceService) { }

  get thisYear(): number {
    return new Date().getFullYear();
  }

}
