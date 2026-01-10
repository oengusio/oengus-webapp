import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { Marathon } from '../../../../model/marathon';
import { BasicUserInfo } from '../../../../model/user';
import { UserLinkComponent } from '../../../elements/user-link/user-link.component';

@Component({
    selector: 'app-sidebar-moderators',
    templateUrl: './sidebar-moderators.component.html',
    styleUrls: ['./sidebar-moderators.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        UserLinkComponent,
    ]
})
export class SidebarModeratorsComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  moderators: BasicUserInfo[] = [];

  ngOnInit(): void {
    this.moderators.push(this.marathon.creator);
    this.moderators.push(...this.marathon.moderators);
  }

}
