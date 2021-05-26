import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Marathon, MarathonWithExtraData} from '../../model/marathon';
import * as moment from 'moment';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { environment } from '../../environments/environment';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public nextMarathons: Marathon[];
  public openMarathons: MarathonWithExtraData[];
  public liveMarathons: Marathon[];
  public moderatedMarathons: Marathon[];

  public faGlobe = faGlobe;
  public faDiscord = faDiscord;
  public faTwitch = faTwitch;

  public moment = moment;
  public environment = environment;

  constructor(private route: ActivatedRoute,
              public userService: UserService) {
    this.nextMarathons = this.route.snapshot.data.homepageMetadata.next;
    const openMarathons = this.route.snapshot.data.homepageMetadata.open;
    this.liveMarathons = this.route.snapshot.data.homepageMetadata.live;
    this.moderatedMarathons = this.route.snapshot.data.homepageMetadata.moderated;

    this.openMarathons = openMarathons.map((marathon: Marathon) => ({
      ...marathon,
      effectiveDate: marathon.submissionsEndDate || marathon.startDate,
      translateKey: marathon.submissionsEndDate ? 'homepage.submissions_close' : 'homepage.starts',
    }));
  }

  ngOnInit() {
  }

}
