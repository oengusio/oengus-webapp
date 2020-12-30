import { Component, OnInit } from '@angular/core';
import Patron from '../../model/patron';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patrons',
  templateUrl: './patrons.component.html',
  styleUrls: ['./patrons.component.scss']
})
export class PatronsComponent implements OnInit {
  public patrons: Patron[];

  constructor(private route: ActivatedRoute) {
    this.patrons = this.route.snapshot.data.patrons.patrons;
  }

  ngOnInit() {
    //
  }
}
