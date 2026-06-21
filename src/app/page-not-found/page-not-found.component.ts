import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class PageNotFoundComponent implements OnInit {
  public path = '';
  public titleKey = '';

  constructor() {
    const maxTitles = 5;

    this.titleKey = `errors.404.title${Math.floor(Math.random() * maxTitles)}`;
  }

  ngOnInit() {
    this.path = window.location.pathname;
  }

}
