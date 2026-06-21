import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MarathonService } from '../../services/marathon.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../services/title.service';
import { MarathonHeaderComponent } from './layout/marathon-header/marathon-header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
    selector: 'app-marathon',
    templateUrl: './marathon.component.html',
    styleUrls: ['./marathon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterOutlet,
        MarathonHeaderComponent,
        SidebarComponent,
    ]
})
export class MarathonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(TitleService);
  userService = inject(UserService);
  marathonService = inject(MarathonService);


  public faTimes = faTimes;

  public collapsed = false;

  constructor() {
    if (!this.marathonService.marathon || this.marathonService.marathon.id !== this.route.snapshot.data.marathon.id) {
      // @ts-expect-error meh.
      delete this.marathonService.marathon;
      this.marathonService.marathon = {...this.route.snapshot.data.marathon};
    }
  }

  ngOnInit() {
    // Show the sidebar by default on desktop-class devices
    this.collapsed = (globalThis.innerWidth ?? 1024) < 1024;
  }

  get isAdmin() {
    return this.marathonService.isAdmin(this.userService.user);
  }

  toggleSidebar(newCollapsed: boolean) {
    this.collapsed = newCollapsed;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marathonRouteActivate(component: any) {
    if (Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(component), 'title')) {
      this.titleService.setSubTitle(component.title);
    } else {
      this.titleService.resetSubTitle();
    }
  }

  get title(): string {
    return this.marathonService.marathon.name;
  }

}
