import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  get title(): string {
    return 'About';
  }

}
