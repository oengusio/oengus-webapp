import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Marathon } from '../../../../model/marathon';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
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
