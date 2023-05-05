import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faBullseye, faDonate, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-tracker',
  templateUrl: './sidebar-tracker.component.html',
  styleUrls: ['./sidebar-tracker.component.scss']
})
export class SidebarTrackerComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  iconDonate = faDonate;
  iconMoney = faMoneyBill;
  iconIncentives = faBullseye;

  constructor() { }

  ngOnInit(): void {
  }

  get marathonId() {
    return this.marathon.id;
  }

  get acceptingDonations() {
    if (!this.marathon) {
      return false;
    }

    const start = new Date(this.marathon.startDate).getTime();
    const end = new Date(this.marathon.endDate).getTime();
    const now = Date.now();
    return this.marathon.hasDonations && this.marathon.donationsOpen && (start <= now && now <= end);
  }

}
