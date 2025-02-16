import { Component, OnInit } from '@angular/core';
import { getRandomPun } from '../shirt-common';

@Component({
    selector: 'app-oengus-shirt-wide',
    templateUrl: './oengus-shirt-wide.component.html',
    styleUrls: ['./oengus-shirt-wide.component.scss'],
    standalone: false
})
export class OengusShirtWideComponent implements OnInit {

  public tagline: string;

  constructor() {
    // Use the same pun for all instances
    this.tagline = getRandomPun();
  }

  ngOnInit(): void {
  }

}
