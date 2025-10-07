import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleCreateRequest } from '../../../../model/schedule';
import { firstValueFrom } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    standalone: false
})
export class CreateComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private scheduleService = inject(ScheduleService);
  private toastr = inject(NwbAlertService);

  env = environment;

  marathonId = '';

  data: ScheduleCreateRequest = {
    name: '',
    slug: '',
  };

  loading = false;

  constructor() {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
  }

  async submit(): Promise<void> {
    this.loading = true;

    this.data.slug = this.data.slug.toLowerCase();

    try {
      const createdSchedule = await firstValueFrom(
        this.scheduleService.createSchedule(
          this.marathonId,
          this.data
        )
      );

      const alertConfig: NwbAlertConfig = {
        message: 'Schedule created!',
        duration: 5000,
        position: 'is-right',
        color: 'is-success'
      };
      this.toastr.open(alertConfig);

      this.router.navigate([
        'marathon', this.marathonId, 'schedule-management', createdSchedule.id
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);

      if (e.status === 401) {
        const alertConfig: NwbAlertConfig = {
          message: 'You don\'t have permission to create a new schedule. ' +
            'Marathons owned by patreon supporters can make up to 4 schedules, any other marathons can only have a single schedule.',
          duration: 10 * 1000,
          position: 'is-right',
          color: 'is-warning'
        };
        this.toastr.open(alertConfig);
      } else {
        const alertConfig: NwbAlertConfig = {
          message: `Something went wrong: ${e.message}`,
          duration: 5000,
          position: 'is-right',
          color: 'is-warning'
        };
        this.toastr.open(alertConfig);
      }
    } finally {
      this.loading = false;
    }
  }

}
