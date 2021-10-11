import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {LoadingBarService} from '../../../services/loading-bar.service';
import {DeactivateRouteGuard} from '../../guards/deactivate-route-guard.service';

@Component({
  selector: 'app-v2-link',
  templateUrl: './v2-link.component.html',
  styleUrls: ['./v2-link.component.scss'],
})
// TODO: don't forget to add the DeactivateRouteGuard class to the "canActivate" clause
export class V2LinkComponent implements OnInit {
  @Input() public route: string;
  @ViewChild('theLink', {static: false}) linkInput: ElementRef<HTMLAnchorElement>;

  public storedUrl: string = null;

  constructor(private loadingbar: LoadingBarService) {
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

      if (environment.v2Domain) {
        DeactivateRouteGuard.deactivatedRoutes.push(this.storedUrl);
      }
    }, 0);
  }

  redirect (event: MouseEvent): boolean {
    if (!environment.v2Domain) {
      return true;
    }

    event.preventDefault();

    const href = this.storedUrl;
    const urlLanguage = V2LinkComponent.getUrlLanguage();
    const targetUrl = `${environment.v2Domain}${urlLanguage}${href}`;

    console.log(targetUrl);

    setTimeout(() => {
      this.loadingbar.setLoading(true);
    }, 0);

    window.location.assign(targetUrl);

    return false;
  }
}
