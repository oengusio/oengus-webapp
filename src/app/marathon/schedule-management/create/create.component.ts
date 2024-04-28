import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleCreateRequest } from '../../../../model/schedule';
import { firstValueFrom } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  env = environment;

  marathonId = '';

  data: ScheduleCreateRequest = {
    name: '',
    slug: '',
  };

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
  ) {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
  }

  async submit(): Promise<void> {
    this.loading = true;

    try {
      const createdSchedule = await firstValueFrom(
        this.scheduleService.createSchedule(
          this.marathonId,
          this.data
        )
      );

      // TODO: toast with success message
      this.router.navigate([
        'marathon', this.marathonId, 'schedule-management', createdSchedule.id
      ]);
    } catch (e: any) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

}
