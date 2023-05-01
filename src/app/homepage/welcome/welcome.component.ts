import { Component, OnInit } from '@angular/core';
import { faCheck, faAngleDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-homepage-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  faCheck = faCheck;
  faAngleDown = faAngleDown;
  isFoldOpen = false;
  plannedFeatures = [
    { key: '1', complete: true },
    { key: '2', complete: false },
    { key: '3', complete: true },
    { key: '4', complete: false },
    { key: '5', complete: true },
    { key: '6', complete: false },
    { key: '7', complete: false },
    { key: 'volunteerManager', complete: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openFold(): void {
    this.isFoldOpen = true;
  }
}
