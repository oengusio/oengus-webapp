import { Component, OnInit } from '@angular/core';
import { getRandomPun } from '../shirt-common';

@Component({
  selector: 'app-oengus-shirt-tall',
  templateUrl: './oengus-shirt-tall.component.html',
  styleUrls: ['./oengus-shirt-tall.component.scss']
})
export class OengusShirtTallComponent implements OnInit {

  public tagline: string;

  constructor() {
    // Use the same pun for all instances
    this.tagline = getRandomPun();
  }

  ngOnInit(): void {
  }

}
