import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MarathonComponent } from './marathon.component';
import { HomeComponent } from './home/home.component';
import { NewMarathonComponent } from './new-marathon/new-marathon.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@busacca/ng-pick-datetime';
import { NwbCommonModule, NwbEditInPlaceModule, NwbPaginatorModule, NwbSwitchModule } from '@wizishop/ng-wizi-bulma';
import { DirectivesModule } from '../directives/directives.module';
import { CanActivateMarathonSettingsGuard } from '../guards/can-activate-marathon-settings-guard.service';
import { MarathonResolver } from '../resolvers/marathon-resolver';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './settings/settings.component';
import { SubmitComponent } from './submit/submit.component';
import { SubmissionResolver } from '../resolvers/submission-resolver';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../services/http-loader-factory';
import { SelectionComponent } from './selection/selection.component';
import { SelectionResolver } from '../resolvers/selection-resolver';
import { CanActivateMarathonSubmitGuard } from '../guards/can-activate-marathon-submit-guard.service';
import { ScheduleManagementComponent } from './schedule-management/schedule-management.component';
import { ScheduleResolver } from '../resolvers/schedule-resolver';
import { OengusCommonModule } from '../oengus-common/oengus-common.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScheduleComponent } from './schedule/schedule.component';
import { AvailabilitiesResolver } from '../resolvers/availabilities-resolver';
import { IncentiveManagementComponent } from './incentive-management/incentive-management.component';
import { IncentivesResolver } from '../resolvers/incentives-resolver';
import { IncentiveComponent } from './incentive/incentive.component';
import { CanActivateMarathonIncentivesGuard } from '../guards/can-activate-marathon-incentives-guard.service';
import { DonateComponent } from './donate/donate.component';
import { CanActivateMarathonDonationsGuard } from '../guards/can-activate-marathon-donations-guard.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { DonationsComponent } from './donations/donations.component';
import { DonationsResolver } from '../resolvers/donations-resolver';
import { DonationsStatsResolver } from '../resolvers/donations-stats-resolver';
import { CanActivateMarathonActiveGuard } from '../guards/can-activate-marathon-active-guard.service';
import {AdsenseComponent} from '../adsense/adsense.component';
import {SubmissionsResolver} from '../resolvers/submissions-resolver';
import { SubmissionCategoryComponent } from './submissions/submission-category/submission-category.component';
import { SubmissionGameComponent } from './submissions/submission-game/submission-game.component';
import {ButtonsModule} from '../buttons/buttons.module';
import {DeactivateRouteGuard} from '../guards/deactivate-route-guard.service';
import { OengusMdComponent } from '../oengus-md/oengus-md.component';
import { AnswersResolver } from '../resolvers/answers-resolver';

const marathonRoutes: Routes = [
  {
    path: 'marathon/new',
    component: NewMarathonComponent
  },
  {
    path: 'marathon/:id',
    component: MarathonComponent,
    resolve: {
      marathon: MarathonResolver
    },
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [DeactivateRouteGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [CanActivateMarathonSettingsGuard]
      },
      {
        path: 'submit',
        component: SubmitComponent,
        resolve: {
          submission: SubmissionResolver
        },
        canActivate: [CanActivateMarathonSubmitGuard, CanActivateMarathonActiveGuard]
      },
      {
        path: 'submissions',
        component: SubmissionsComponent,
        resolve: {
          answers: AnswersResolver,
          submissions: SubmissionsResolver,
          selection: SelectionResolver,
        }
      },
      {
        path: 'selection',
        component: SelectionComponent,
        resolve: {
          submissions: SubmissionsResolver,
          selection: SelectionResolver
        },
        data: {
          statuses: []
        },
        canActivate: [CanActivateMarathonSettingsGuard, CanActivateMarathonActiveGuard]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        resolve: {
          schedule: ScheduleResolver
        },
        canActivate: [DeactivateRouteGuard]
      },
      {
        path: 'schedule/manage',
        component: ScheduleManagementComponent,
        resolve: {
          submissions: SubmissionsResolver,
          selection: SelectionResolver,
          schedule: ScheduleResolver,
          availabilities: AvailabilitiesResolver
        },
        data: {
          statuses: ['VALIDATED', 'BONUS'],
          withCustomData: true,
        },
        canActivate: [CanActivateMarathonSettingsGuard, CanActivateMarathonActiveGuard]
      },
      {
        path: 'incentives',
        component: IncentiveComponent,
        resolve: {
          incentives: IncentivesResolver
        },
        data: {
          withLocked: true,
          withUnapproved: false
        },
        canActivate: [CanActivateMarathonIncentivesGuard]
      },
      {
        path: 'incentives/manage',
        component: IncentiveManagementComponent,
        resolve: {
          schedule: ScheduleResolver,
          incentives: IncentivesResolver
        },
        data: {
          withLocked: true,
          withUnapproved: true
        },
        canActivate: [CanActivateMarathonSettingsGuard, CanActivateMarathonIncentivesGuard, CanActivateMarathonActiveGuard]
      },
      {
        path: 'donate',
        component: DonateComponent,
        resolve: {
          incentives: IncentivesResolver
        },
        data: {
          withLocked: false,
          withUnapproved: false
        },
        canActivate: [CanActivateMarathonDonationsGuard, CanActivateMarathonActiveGuard]
      },
      {
        path: 'donations',
        component: DonationsComponent,
        resolve: {
          donations: DonationsResolver,
          stats: DonationsStatsResolver
        },
        canActivate: [CanActivateMarathonDonationsGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    MarathonComponent,
    HomeComponent,
    NewMarathonComponent,
    SettingsComponent,
    SubmitComponent,
    SubmissionsComponent,
    SelectionComponent,
    ScheduleManagementComponent,
    ScheduleComponent,
    IncentiveManagementComponent,
    IncentiveComponent,
    DonateComponent,
    DonationsComponent,
    AdsenseComponent,
    SubmissionCategoryComponent,
    SubmissionGameComponent,
    OengusMdComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(marathonRoutes),
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NwbSwitchModule,
    DirectivesModule,
    FontAwesomeModule,
    NwbCommonModule,
    AutocompleteLibModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OengusCommonModule,
    DragDropModule,
    NwbEditInPlaceModule,
    NgxPayPalModule,
    NwbPaginatorModule,
    ButtonsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateMarathonSettingsGuard,
    CanActivateMarathonSubmitGuard,
    CanActivateMarathonIncentivesGuard,
    CanActivateMarathonDonationsGuard,
    CanActivateMarathonActiveGuard,
    MarathonResolver,
    SubmissionResolver,
    SubmissionsResolver,
    ScheduleResolver,
    SelectionResolver,
    IncentivesResolver,
    AvailabilitiesResolver,
    DonationsResolver,
    DonationsStatsResolver,
    AnswersResolver,
  ]
})
export class MarathonModule {
}
