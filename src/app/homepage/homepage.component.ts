import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HomepageMetadata } from '../../model/homepage-metadata';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    standalone: false
})
export class HomepageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  userService = inject(UserService);


  homepageMarathons: HomepageMetadata;

  ngOnInit() {
    this.homepageMarathons = this.route.snapshot.data.homepageMetadata;
    // Set moderated from other fetch
    this.homepageMarathons.moderated = this.route.snapshot.data.moderatedMarathons;
  }

}
