import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HomepageMetadata } from '../../model/homepage-metadata';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  homepageMarathons: HomepageMetadata;

  constructor(private route: ActivatedRoute,
              public userService: UserService) {
  }

  ngOnInit() {
    this.homepageMarathons = this.route.snapshot.data.homepageMetadata;
    // Set moderated from other fetch
    this.homepageMarathons.moderated = this.route.snapshot.data.moderatedMarathons;
  }

}
