import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../../services/schedule.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  scheduleInfo: ScheduleInfo;
  marathonId = '';
  oldSlug = '';

  loading = false;

  env = environment;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
  ) {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
    this.scheduleInfo = this.route.snapshot.data.scheduleInfo;
    this.oldSlug = this.scheduleInfo.slug;
  }

  async submit(): Promise<void> {
    try {
      this.loading = true;
      await firstValueFrom(
        this.scheduleService.updateSchedule(this.marathonId, this.scheduleInfo.id, this.scheduleInfo)
      );
    } catch (e: any) {
      console.log(e);
      alert(`Something broke: ${e.message}`);
    } finally {
      this.loading = false;
    }
  }
}
