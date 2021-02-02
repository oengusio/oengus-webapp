import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './adsense.component.html',
})
export class AdsenseComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
