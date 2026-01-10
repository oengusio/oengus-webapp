import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HomepageMetadata } from '../../model/homepage-metadata';
import { WelcomeComponent } from './welcome/welcome.component';
import { MarathonsComponent } from './marathons/marathons.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    imports: [
        CommonModule,
        WelcomeComponent,
        MarathonsComponent,
        SponsorsComponent,
    ]
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
