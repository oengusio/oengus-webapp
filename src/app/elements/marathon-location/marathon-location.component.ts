import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Marathon } from '../../../model/marathon';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { NwbToolTipDirective } from '../../components/wizi/tooltip/tooltip.directive';

@Component({
    selector: 'app-marathon-location',
    templateUrl: './marathon-location.component.html',
    styleUrls: ['./marathon-location.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    NwbToolTipDirective,
  ],
})
export class MarathonLocationComponent {
  // @ts-expect-error meh.
  @Input() marathon: Marathon;

  public faDesktop = faDesktop;

  get hasCountry(): boolean {
    return this.marathon.onsite && !!this.marathon.country;
  }
}
