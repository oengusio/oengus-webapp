import {Component, AfterViewInit, Input} from '@angular/core';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './adsense.component.html',
})
export class AdsenseComponent implements AfterViewInit {
  @Input('maxWidth') maxWidth: string;

  constructor() {}

  ngAfterViewInit() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
