import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Marathon } from 'src/model/marathon';
import { MarathonService } from '../../../../services/marathon.service';

@Component({
    selector: 'app-marathon-header',
    templateUrl: './marathon-header.component.html',
    styleUrls: ['./marathon-header.component.scss'],
    standalone: false
})
export class MarathonHeaderComponent {
  marathonService = inject(MarathonService);

  @Input() isAdmin: boolean;
  @Input() collapsed: boolean;
  @Input() marathon: Marathon;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  get marathonName(): string {
    if (this.marathonService.marathon) {
      return this.marathonService.marathon.name;
    }

    return '';
  }

  get buttonClass() {
    return {
      'is-active': !this.collapsed,
    };
  }
}
