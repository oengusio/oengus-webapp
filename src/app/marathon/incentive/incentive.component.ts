import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incentive } from '../../../model/incentive';
import { MarathonService } from '../../../services/marathon.service';

@Component({
    selector: 'app-incentive',
    templateUrl: './incentive.component.html',
    styleUrls: ['./incentive.component.scss'],
    standalone: false
})
export class IncentiveComponent implements OnInit {
  private route = inject(ActivatedRoute);
  marathonService = inject(MarathonService);


  public incentives: Incentive[];

  constructor() {
    this.incentives = this.route.snapshot.data.incentives;
  }

  ngOnInit() {
  }


  get title(): string {
    return 'Incentives';
  }
}
