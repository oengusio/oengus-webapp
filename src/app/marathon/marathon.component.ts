import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MarathonService } from '../../services/marathon.service';
import {
  faBook,
  faBullseye,
  faCalendarAlt,
  faCalendarCheck,
  faCaretSquareLeft,
  faCaretSquareRight,
  faCheckSquare,
  faCogs,
  faDonate,
  faDotCircle,
  faHome,
  faMoneyBill,
  faPaperPlane,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {TitleService} from '../../services/title.service';

@Component({
  selector: 'app-marathon',
  templateUrl: './marathon.component.html',
  styleUrls: ['./marathon.component.scss']
})
export class MarathonComponent implements OnInit {

  public faHome = faHome;
  public faBook = faBook;
  public faPaperPlane = faPaperPlane;
  public faCalendar = faCalendarAlt;
  public faDonate = faDonate;
  public faMoneyBill = faMoneyBill;
  public faBullseye = faBullseye;
  public faCogs = faCogs;
  public faCheckSquare = faCheckSquare;
  public faCalendarCheck = faCalendarCheck;
  public faDotCircle = faDotCircle;
  public faCaretLeft = faCaretSquareLeft;
  public faCaretRight = faCaretSquareRight;
  public faBars = faBars;
  public faTimes = faTimes;

  public minimized = false;
  public mobileOpen = true;
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
  }

  isAdmin() {
    return this.marathonService.isAdmin(this.userService.user);
  }

  marathonRouteActivate(component) {
    // hack for reloading the ad :)
    this.showAdsense = false;

    setTimeout(() => {
      this.showAdsense = true;
    }, 0);

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
