import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule } from '@oengus/angular-datetime-picker';
import { Marathon } from '../../../model/marathon';
import { MarathonService } from '../../../services/marathon.service';
import { environment } from '../../../environments/environment';
import { DirectivesModule } from '../../directives/directives.module';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';
import { NwbSwitchComponent } from '../../components/wizi/switch/switch.component';

@Component({
    selector: 'app-new-marathon',
    templateUrl: './new-marathon.component.html',
    styleUrls: ['./new-marathon.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    OwlDateTimeModule,
    DirectivesModule,
    NwbSwitchComponent,
  ],
})
export class NewMarathonComponent implements OnInit {
  marathonService = inject(MarathonService);
  private temporalService = inject(TemporalServiceService);

  // @ts-expect-error meh.
  public marathon: Marathon;
  public now = this.temporalService.now.with({ second: 0 });
  public env = environment;
  public loading = false;
  public marathonId = '';

  readonly title = 'Create a new marathon';

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
