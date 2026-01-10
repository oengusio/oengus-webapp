import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { V2ScheduleLine } from '../../../../model/schedule-line';
import { SimpleMdComponent } from '../../../components/simple-md/simple-md.component';
import { UserLinkComponent } from '../../../elements/user-link/user-link.component';

@Component({
    selector: 'app-marathon-schedule-current',
    templateUrl: './marathon-schedule-current.component.html',
    styleUrls: ['./marathon-schedule-current.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        SimpleMdComponent,
        UserLinkComponent,
    ]
})
export class MarathonScheduleCurrentComponent {
  private temporal = inject(TemporalServiceService);

  @Input() isNext = false;
  @Input() ticker: V2ScheduleLine;

  get messageClass(): string {
    return this.isNext ? '' : 'is-primary';
  }

  get linkedRun(): string {
    return this.isNext ? 'next' : 'current';
  }

  get messageHeaderTitle(): string {
    return this.isNext ? 'marathon.schedule.nextRun' : 'marathon.schedule.currentRun';
  }

  get messageHeaderArgs(): { duration?: string } {
    return this.isNext ? { duration: this.temporal.distance.format(this.ticker?.date ?? new Date()) } : { };
  }

}
