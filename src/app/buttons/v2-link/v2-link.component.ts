import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-v2-link',
  templateUrl: './v2-link.component.html',
  styleUrls: ['./v2-link.component.scss'],
})
export class V2LinkComponent implements OnInit {
  @Input() public route: string;
  @ViewChild('theLink', {static: true}) linkInput: ElementRef<HTMLAnchorElement>;

  public storedUrl: string = null;

  constructor(private router: Router) {
    //
  }

  private static getUrlLanguage(): string {
    const item = localStorage.getItem('language');

    if (item === 'en') {
      return 'en-GB';
    }

    return item.replace('_', '-');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.storedUrl = this.linkInput.nativeElement.getAttribute('href');

      console.log(this.storedUrl);
    }, 0);
  }

  redirect (): boolean {
    const href = this.storedUrl;
    const urlLanguage = V2LinkComponent.getUrlLanguage();
    const targetUrl = `${environment.v2Domain}${urlLanguage}${href}`;

    console.log(targetUrl);

    window.location.assign(targetUrl);

    return false;
  }
}
