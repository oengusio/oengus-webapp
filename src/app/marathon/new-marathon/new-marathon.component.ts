import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { Marathon } from '../../../model/marathon';
import { MarathonService } from '../../../services/marathon.service';
import { environment } from '../../../environments/environment';
import { DirectivesModule } from '../../directives/directives.module';

@Component({
    selector: 'app-new-marathon',
    templateUrl: './new-marathon.component.html',
    styleUrls: ['./new-marathon.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NwbSwitchModule,
        DirectivesModule,
    ]
})
export class NewMarathonComponent implements OnInit {
  marathonService = inject(MarathonService);

  public marathon: Marathon;
  public now: Date;
  public env = environment;
  public loading = false;
  public marathonId = '';

  readonly title = 'Create a new marathon';

  constructor() {
    this.now = new Date();
    this.now.setSeconds(0);
  }

  ngOnInit() {
    this.marathon = new Marathon();
  }

  submit() {
    this.loading = true;
    this.marathonService.create(this.marathon).add(() => {
      this.loading = false;
    });
  }
}
