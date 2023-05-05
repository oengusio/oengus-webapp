import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faBook, faHome, faHomeLg, faCalendar, faPaperPlane, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-overview',
  templateUrl: './sidebar-overview.component.html',
  styleUrls: ['./sidebar-overview.component.scss']
})
export class SidebarOverviewComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  isBigHome = true;
  iconCircle = faCircle;
  iconPaperPlane = faPaperPlane;
  iconCalendar = faCalendar;
  iconBook = faBook;

  constructor() { }

  ngOnInit(): void {
  }

  get iconHome() {
    return this.isBigHome ? faHomeLg : faHome;
  }

  get marathonId() {
    return this.marathon.id;
  }

}
