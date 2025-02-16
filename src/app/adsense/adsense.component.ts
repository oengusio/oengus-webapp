import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'app-google-adsense',
    templateUrl: './adsense.component.html',
    styleUrls: ['./adsense.component.scss'],
    standalone: false
})
export class AdsenseComponent implements AfterViewInit {
  @Input() maxWidth: string;
  @Input() onHeight: string;

  constructor() {}

  ngAfterViewInit() {
    // (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
