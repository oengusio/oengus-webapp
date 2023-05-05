import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MarathonService } from '../../services/marathon.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-marathon',
  templateUrl: './marathon.component.html',
  styleUrls: ['./marathon.component.scss']
})
export class MarathonComponent implements OnInit {

  public faTimes = faTimes;

  public collapsed = false;
  // hack :)
  public showAdsense = true;

  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              public userService: UserService,
              public marathonService: MarathonService) {
    if (!this.marathonService.marathon || this.marathonService.marathon.id !== this.route.snapshot.data.marathon.id) {
      delete this.marathonService.marathon;
      this.marathonService.marathon = {...this.route.snapshot.data.marathon};
    }
  }

  ngOnInit() {
    // Show the sidebar by default on desktop-class devices
    this.collapsed = (globalThis.innerWidth ?? 1024) < 1024;
  }

  isAdmin() {
    return this.marathonService.isAdmin(this.userService.user);
  }

  marathonRouteActivate(component) {
    // hack for reloading the ad :)
    this.showAdsense = false;

    setTimeout(() => {
      this.showAdsense = true;
    }, 100);

    if (Object.getPrototypeOf(component).hasOwnProperty('title')) {
      this.titleService.setSubTitle(component.title);
    } else {
      this.titleService.resetSubTitle();
    }
  }

  get title(): string {
    return this.marathonService.marathon.name;
  }

}
