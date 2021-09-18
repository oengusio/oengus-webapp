import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  public path: string;
  public titleKey: string;

  constructor() {
    const maxTitles = 5;

    this.titleKey = `errors.404.title${Math.floor(Math.random() * maxTitles)}`;
  }

  ngOnInit() {
    this.path = window.location.pathname;
  }

}
