import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Marathon } from '../../../model/marathon';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-marathon-location',
    templateUrl: './marathon-location.component.html',
    styleUrls: ['./marathon-location.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
    ]
})
export class MarathonLocationComponent {

  @Input() marathon: Marathon;

  public faDesktop = faDesktop;

  get hasCountry(): boolean {
    return this.marathon.onsite && !!this.marathon.country;
  }
}
