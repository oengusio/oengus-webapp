import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleCreateRequest } from '../../../../model/schedule';
import { firstValueFrom } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';
import { DirectivesModule } from '../../../directives/directives.module';
import { NotificationService } from '../../../../services/notification.service';

// TODO: translations
@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        DirectivesModule,
    ]
})
export class CreateComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private scheduleService = inject(ScheduleService);
  private toastr = inject(NotificationService);

  env = environment;

  marathonId = '';

  data: ScheduleCreateRequest = {
    name: '',
    slug: '',
  };

  loading = false;

  constructor() {
    this.marathonId = this.route.snapshot.parent?.paramMap.get('id') ?? '';
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

      this.toastr.toastRaw('Schedule created!', 5000);

      this.router.navigate([
        'marathon', this.marathonId, 'schedule-management', createdSchedule.id
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);

      if (e.status === 401) {
        this.toastr.toastRaw(
          'You don\'t have permission to create a new schedule. ' +
          'Marathons owned by patreon supporters can make up to 4 schedules, any other marathons can only have a single schedule.',
          10 * 1000,
          'warning',
        );
      } else {
        this.toastr.toastRaw(`Something went wrong: ${e.message}`, 5000, 'warning');
      }
    } finally {
      this.loading = false;
    }
  }

}
