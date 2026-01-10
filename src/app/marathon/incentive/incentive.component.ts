import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Incentive } from '../../../model/incentive';
import { MarathonService } from '../../../services/marathon.service';
import { OengusCommonModule } from '../../oengus-common/oengus-common.module';

@Component({
    selector: 'app-incentive',
    templateUrl: './incentive.component.html',
    styleUrls: ['./incentive.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        OengusCommonModule,
    ]
})
export class IncentiveComponent {
  private route = inject(ActivatedRoute);
  marathonService = inject(MarathonService);

  public incentives: Incentive[];

  readonly title = 'Incentives';

  constructor() {
    this.incentives = this.route.snapshot.data.incentives;
  }
}
