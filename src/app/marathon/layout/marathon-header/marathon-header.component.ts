import { Component, Input, OnInit } from '@angular/core';
import { Marathon } from 'src/model/marathon';
import { MarathonService } from '../../../../services/marathon.service';

@Component({
  selector: 'app-marathon-header',
  templateUrl: './marathon-header.component.html',
  styleUrls: ['./marathon-header.component.scss']
})
export class MarathonHeaderComponent implements OnInit {
  @Input() public collapsed: boolean;

  constructor(public marathonService: MarathonService) { }

  ngOnInit(): void {
  }

  get marathonName(): string {
    if (this.marathonService.marathon) {
      return this.marathonService.marathon.name;
    }

    return '';
  }

  get buttonClass() {
    return {
      'is-active': !this.collapsed,
    };
  }

  toggleSidebar(): void {
    //
  }
}
