import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { Marathon } from '../../../model/marathon';
import { DetailsComponent } from './details/details.component';
import { HomeSubmitButtonComponent } from './home-submit-button/home-submit-button.component';
import { DescriptionComponent } from './description/description.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
        DetailsComponent,
        HomeSubmitButtonComponent,
        DescriptionComponent,
    ]
})
export class HomeComponent {
  marathonService = inject(MarathonService);
  userService = inject(UserService);


  get marathon(): Marathon {
    return this.marathonService.marathon;
  }

}
