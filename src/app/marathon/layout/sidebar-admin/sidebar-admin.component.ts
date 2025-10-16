import { Component, HostBinding, Input } from '@angular/core';
import { Marathon } from '../../../../model/marathon';

@Component({
    selector: 'app-sidebar-admin',
    templateUrl: './sidebar-admin.component.html',
    styleUrls: ['./sidebar-admin.component.scss'],
    standalone: false
})
export class SidebarAdminComponent {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  get marathonId() {
    return this.marathon.id;
  }

}
