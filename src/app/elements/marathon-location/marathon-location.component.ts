import { Component, Input } from '@angular/core';
import { Marathon } from '../../../model/marathon';

@Component({
    selector: 'app-marathon-location',
    templateUrl: './marathon-location.component.html',
    styleUrls: ['./marathon-location.component.scss'],
    standalone: false
})
export class MarathonLocationComponent {

  @Input() marathon: Marathon;

  get hasCountry(): boolean {
    return this.marathon.onsite && !!this.marathon.country;
  }
}
