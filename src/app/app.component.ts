import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter } from '@busacca/ng-pick-datetime';
import { environment } from '../environments/environment';
import { Location } from '@angular/common';
import { Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingBarService } from '../services/loading-bar.service';
import { TitleService } from '../services/title.service';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';
import * as Sentry from '@sentry/angular';
import { TemporalServiceService } from '../services/termporal/temporal-service.service';
import { LocaleService } from '../services/locale.service';
import { FaConfig } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = !environment.sandbox ? 'Oengus' : 'Oengus [Sandbox]';

  // @ViewChild('navBurger', {static: true}) navBurger: ElementRef;
  // @ViewChild('navMenu', {static: true}) navMenu: ElementRef;

  public language = localStorage.getItem('language') ? localStorage.getItem('language') : navigator.language.split('-')[0];
  public environment = environment;
  public loading = true;

  constructor(public userService: UserService,
              private translate: TranslateService,
              private toastr: NwbAlertService,
              private dateTimeAdapter: DateTimeAdapter<any>,
              private router: Router,
              private location: Location,
              private titleService: TitleService,
              private loader: LoadingBarService,
              private temporal: TemporalServiceService,
              private localeService: LocaleService,
              faConfig: FaConfig,
  ) {
    faConfig.autoAddCss = false;

    this.loader.stateObserver.subscribe((loading) => {
      this.loading = loading;
    });
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    if (!this.userService.user && this.userService.token) {
      this.userService.me().add(() => {
        const user = this.userService.user;

        // Is this user activated?
        if (user && user.email && !user.enabled) {
          this.userService.logout(false);
          this.translate.get('alert.user.login.disabledAccount').subscribe((res: string) => {
            const alertConfig: NwbAlertConfig = {
              message: res,
              duration: 5000,
              position: 'is-right',
              color: 'is-warning'
            };
            this.toastr.open(alertConfig);
          });

          return;
        }

        // are we allowed to track the user?
        if (user && localStorage.getItem('consent') === 'true') {
          Sentry.setUser({
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            connections: user.connections,
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.localeService.initialize();
  }

  onRouteActivated(component) {
    if (Object.getPrototypeOf(component).hasOwnProperty('title')) {
      this.titleService.setTitle(component.title);
    } else {
      this.titleService.resetTitle();
    }
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      // close the navbar
      // this.navBurger.nativeElement.classList.remove('is-active');
      // this.navMenu.nativeElement.classList.remove('is-active');

      this.loader.setLoading(true);
    } else if (event instanceof NavigationEnd) {
      this.loader.setLoading(false);

      // Set loading state to false in both of the below events to hide the loader in case a request fails
    } else if (event instanceof NavigationCancel) {
      this.loader.setLoading(false);
    } else if (event instanceof NavigationError) {
      this.loader.setLoading(false);

      // stay on the same route if something fails
      this.router.navigate(['/404'], {skipLocationChange: true})
        .then(() =>  this.location.go(event.url));
    }
  }
}
