import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marathon } from '../../../../model/marathon';
import { SidebarOverviewComponent } from '../../../components/marathon-sidebar-overview/sidebar-overview.component';
import { SidebarTrackerComponent } from '../sidebar-tracker/sidebar-tracker.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { SidebarModeratorsComponent } from '../sidebar-moderators/sidebar-moderators.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [
        CommonModule,
        SidebarOverviewComponent,
        SidebarTrackerComponent,
        SidebarAdminComponent,
        SidebarModeratorsComponent,
    ]
})
export class SidebarComponent {
  @Input() isAdmin: boolean;
  @Input() collapsed = false;
  @Input() marathon: Marathon;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  get isActiveClass() {
    return {
      'is-active': !this.collapsed,
    };
  }
}
