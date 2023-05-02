import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../interceptors';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@busacca/ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NwbAlertModule, NwbCommonModule, NwbSwitchModule } from '@wizishop/ng-wizi-bulma';
import { MarathonModule } from './marathon/marathon.module';
import { DirectivesModule } from './directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageMetadataResolver } from './resolvers/next-marathons-resolver';
import { UserModule } from './user/user.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OengusCommonModule } from './oengus-common/oengus-common.module';
import { AboutComponent } from './about/about.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { CalendarComponent } from './calendar/calendar.component';
import { WebpackTranslateLoader } from '../loader/webpack-translate-loader';
import { PatronsComponent } from './patrons/patrons.component';
import { PatronsResolver } from './resolvers/patrons-resolver';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { KasperskyAnnouncementComponent } from './news/kaspersky-announcement/kaspersky-announcement.component';
import { ButtonsModule } from './buttons/buttons.module';
import { PlumComponent } from './plum/plum.component';
import * as Sentry from '@sentry/angular';
import { HomepageModeratedResolver } from './resolvers/homepage-moderated-resolver';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './homepage/welcome/welcome.component';
import { SponsorsComponent } from './homepage/sponsors/sponsors.component';
import { MarathonsComponent } from './homepage/marathons/marathons.component';
import { MarathonLocationComponent } from './components/marathon/marathon-location/marathon-location.component';
import { FooterBarComponent } from './footer/footer-bar/footer-bar.component';
import { FooterPatronsComponent } from './footer/footer-patrons/footer-patrons.component';
import { PatronListComponent } from './components/patron-list/patron-list.component';
import { ElementModule } from './elements/elements.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
]);

const appRoutes: Routes = [
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: SignUpComponent,
  },
  {
    path: 'login/:service',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomepageComponent,
    resolve: {
      homepageMetadata: HomepageMetadataResolver,
      moderatedMarathons: HomepageModeratedResolver,
    }
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'patrons',
    component: PatronsComponent,
    resolve: {
      patrons: PatronsResolver
    }
  },
  /*{
    path: 'news/kaspersky-partnership',
    component: KasperskyAnnouncementComponent,
  },*/
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AboutComponent,
    PatronsComponent,
    CalendarComponent,
    PageNotFoundComponent,
    KasperskyAnnouncementComponent,
    PlumComponent,
    SignUpComponent,
    WelcomeComponent,
    SponsorsComponent,
    MarathonsComponent,
    MarathonLocationComponent,
    FooterBarComponent,
    FooterPatronsComponent,
    PatronListComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NwbSwitchModule,
        NwbAlertModule,
        MarathonModule,
        UserModule,
        DirectivesModule,
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: WebpackTranslateLoader
            }
        }),
        OengusCommonModule,
        NwbCommonModule,
        FullCalendarModule,
        ButtonsModule,
        ElementModule,
    ],
  exports: [RouterModule],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false, // TODO: experiment with this
      }),
    },
    httpInterceptorProviders,
    HomepageMetadataResolver,
    HomepageModeratedResolver,
    PatronsResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

