import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  // @ts-ignore
  moduleId: module.id,
  // tslint:disable-next-line:component-selector
  selector: 'google-adsense',
  template: `
    <!-- Oengus Vertical Responsive -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-1125692619955117"
         data-ad-slot="5905320802"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  `,
})
export class AdsenseComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
