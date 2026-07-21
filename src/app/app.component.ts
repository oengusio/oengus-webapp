import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadingBarService } from '../services/loading-bar.service';
import { TitleService } from '../services/title.service';
import * as Sentry from '@sentry/angular';
import { LocaleService } from '../services/locale.service';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { HeaderBarComponent } from './_layout/header-bar/header-bar.component';
import { FooterBarComponent } from './_layout/footer/footer-bar/footer-bar.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationService } from '../services/notification.service';
import { NwbAlertComponent } from './components/wizi/alert/alert.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderBarComponent,
    FooterBarComponent,
    NotificationListComponent,
    NwbAlertComponent,
  ],
})
export class AppComponent implements OnInit {
  userService = inject(UserService);
  private toastr = inject(NotificationService);
  private router = inject(Router);
  private location = inject(Location);
  private titleService = inject(TitleService);
  private loader = inject(LoadingBarService);
  private localeService = inject(LocaleService);

  title = !environment.sandbox ? 'Oengus' : 'Oengus [Sandbox]';

  // @ViewChild('navBurger', {static: true}) navBurger: ElementRef;
  // @ViewChild('navMenu', {static: true}) navMenu: ElementRef;

  public language = localStorage.getItem('language') ? localStorage.getItem('language') : navigator.language.split('-')[0];
  public environment = environment;
  public loading = true;

  constructor() {
    const faConfig = inject(FaConfig);

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
          this.toastr.toast('alert.user.login.disabledAccount', 5000, 'warning');

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRouteActivated(component: any) {
    if (Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(component), 'title')) {
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
