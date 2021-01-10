import { Component, AfterViewInit } from '@angular/core';

@Component({
  // @ts-ignore
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'google-adsense',
  templateUrl: './adsense.component.html',
})
export class AdsenseComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    console.log('adsense');
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
