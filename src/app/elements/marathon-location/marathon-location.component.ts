import { Component, Input } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-marathon-location',
  templateUrl: './marathon-location.component.html',
  styleUrls: ['./marathon-location.component.scss']
})
export class MarathonLocationComponent {

  @Input() marathon: Marathon;

  public faDesktop = faDesktop;

  get hasCountry(): boolean {
    return this.marathon.onsite && !!this.marathon.country;
  }
}
