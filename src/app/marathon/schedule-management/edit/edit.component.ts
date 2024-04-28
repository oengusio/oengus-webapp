import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  scheduleInfo: ScheduleInfo;
  marathonId = '';
  oldSlug = '';

  loading = false;

  env = environment;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.marathonId = this.route.snapshot.parent.paramMap.get('id');
    this.scheduleInfo = this.route.snapshot.data.scheduleInfo;
    this.oldSlug = this.scheduleInfo.slug;
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    //
  }
}
