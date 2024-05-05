import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';
import { environment } from '../../../../environments/environment';
import { ScheduleService } from '../../../../services/schedule.service';
import { firstValueFrom } from 'rxjs';
import { V2ScheduleLine } from '../../../../model/schedule-line';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  scheduleInfo: ScheduleInfo;
  marathonId = '';
  oldSlug = '';
  lines: Array<V2ScheduleLine> = [];

  loading = false;
  warningModalActive = false;

  env = environment;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toastr: NwbAlertService,
  ) {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
    this.scheduleInfo = this.route.snapshot.data.scheduleInfo;
    this.oldSlug = this.scheduleInfo.slug;
  }

  ngOnInit(): void {
    // the service has updateLines() for updating the lines.
    this.scheduleService.getLines(this.marathonId, this.scheduleInfo.id).subscribe((resp) => {
      this.lines = resp.data;
    });
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

  handlePublishCallback(didConfirm: boolean): void {
    this.warningModalActive = false;

    if (didConfirm) {
      this.publish();
    }
  }

  async publish(): Promise<void> {
    this.loading = true;

    this.scheduleService.publish(this.marathonId, this.scheduleInfo.id).subscribe({
      next () {
        // Reload the window to see the new changes!
        window.location.reload();
      },

      error: (err: any) => {
        console.log(err);
        const alertConfig: NwbAlertConfig = {
          message: `Something went wrong: ${err.message}`,
          duration: 5000,
          position: 'is-right',
          color: 'is-warning'
        };
        this.toastr.open(alertConfig);
      },
    });
  }
}
