import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MarathonService } from '../../services/marathon.service';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'app-marathon',
    templateUrl: './marathon.component.html',
    styleUrls: ['./marathon.component.scss'],
    standalone: false
})
export class MarathonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(TitleService);
  userService = inject(UserService);
  marathonService = inject(MarathonService);

  public collapsed = false;

  constructor() {
    if (!this.marathonService.marathon || this.marathonService.marathon.id !== this.route.snapshot.data.marathon.id) {
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

  marathonRouteActivate(component) {
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
