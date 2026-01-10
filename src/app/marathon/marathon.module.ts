import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarathonComponent } from './marathon.component';
import { HomeComponent } from './home/home.component';
import { NewMarathonComponent } from './new-marathon/new-marathon.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@oengus/angular-datetime-picker';
import { NwbCommonModule, NwbEditInPlaceModule, NwbPaginatorModule, NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { DirectivesModule } from '../directives/directives.module';
import { canActivateMarathonSettingsGuard } from '../guards/can-activate-marathon-settings-guard.service';
import { MarathonResolver } from '../resolvers/marathon-resolver';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './settings/settings.component';
import { SubmitComponent } from './submit/submit.component';
import { SubmissionResolver } from '../resolvers/submission-resolver';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { SelectionComponent } from './selection/selection.component';
import { SelectionResolver } from '../resolvers/selection-resolver';
import { canActivateMarathonSubmitGuard } from '../guards/can-activate-marathon-submit-guard.service';
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
import { DonationsComponent } from './donations/donations.component';
import { DonationsResolver } from '../resolvers/donations-resolver';
import { DonationsStatsResolver } from '../resolvers/donations-stats-resolver';
import { canActivateMarathonActiveGuard } from '../guards/can-activate-marathon-active-guard.service';
import { SubmissionCategoryComponent } from './submissions/submission-category/submission-category.component';
import { SubmissionGameComponent } from './submissions/submission-game/submission-game.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { GeneralSettingsComponent } from './settings/general-settings/general-settings.component';
import { SubmissionSettingsComponent } from './settings/submission-settings/submission-settings.component';
import { DiscordSettingsComponent } from './settings/discord-settings/discord-settings.component';
import { IncentiveSettingsComponent } from './settings/incentive-settings/incentive-settings.component';
import { MarathonScheduleExportComponent } from './schedule/marathon-schedule-export/marathon-schedule-export.component';
import { ElementModule } from '../elements/elements.module';
import { MarathonScheduleCurrentComponent } from './schedule/marathon-schedule-current/marathon-schedule-current.component';
import { MarathonScheduleListComponent } from './schedule/marathon-schedule-list/marathon-schedule-list.component';
import { RunDetailsComponent } from './schedule/run-details/run-details.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { OverviewComponent } from './schedule-management/overview/overview.component';
import { ScheduleOverviewResolver } from '../resolvers/schedule-overview-resolver';
import { CreateComponent } from './schedule-management/create/create.component';
import { EditComponent as ScheduleManagementEditComponent } from './schedule-management/edit/edit.component';
import { ScheduleByIdResolver } from '../resolvers/schedule-by-id-resolver';
import { WarningModalComponent } from './schedule-management/warning-modal/warning-modal.component';
import { ScheduleBySlugResolver } from '../resolvers/schedule-by-slug-resolver';
import { SubmissionsTableComponent } from './schedule-management/edit/submissions-table/submissions-table.component';
import { ScheduleTableComponent } from './schedule-management/edit/schedule-table/schedule-table.component';
import { SetupBlockEditorComponent } from './schedule-management/edit/schedule-table/setup-block-editor/setup-block-editor.component';
import { NormalRunEditorComponent } from './schedule-management/edit/schedule-table/normal-run-editor/normal-run-editor.component';
import { ScheduleEditRowComponent } from './schedule-management/edit/schedule-table/schedule-edit-row/schedule-edit-row.component';
import { SubmissionRowComponent } from './schedule-management/edit/submissions-table/submission-row/submission-row.component';
import {
  ScheduleTableOldElementComponent,
} from './schedule-management/edit/schedule-table-old-element/schedule-table-old-element.component';
import { MarathonScheduleShareComponent } from './schedule/marathon-schedule-share/marathon-schedule-share.component';
import { marathonSettingsResolverResolver } from '../resolvers/marathon-settings-resolver.resolver';
import { questionsResolverResolver } from '../resolvers/questions-resolver.resolver';
import { moderatorsResolver } from '../resolvers/moderators.resolver';
import { ClonePopupComponent } from './schedule-management/edit/clone-popup/clone-popup.component';
import { SubmissionLazyLoaderComponent } from './submissions/submission-lazy-loader/submission-lazy-loader.component';
import { isEmailVerifiedGuardGuard } from '../guards/is-email-verified-guard.guard';
import { SubmitHeaderComponent } from './submit/submit-header/submit-header.component';
import { SubmitMultiplayerJoinComponent } from './submit/submit-multiplayer-join/submit-multiplayer-join.component';
import { SubmitShareButtonsComponent } from './submit/submit-share-buttons/submit-share-buttons.component';
import { DescriptionEditorComponent } from './settings/general-settings/description-editor/description-editor.component';
import { ElementLoginLinkSelectorComponent } from '../elements/element-login-link-selector/element-login-link-selector.component';
import { ImportRunDialogComponent } from './submit/import-run-dialog/import-run-dialog.component';

const marathonRoutes: Routes = [
  {
    path: 'marathon/new',
    component: NewMarathonComponent,
    canActivate: [
      isEmailVerifiedGuardGuard,
    ],
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
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve: {
          settings: marathonSettingsResolverResolver,
          questions: questionsResolverResolver,
          moderators: moderatorsResolver,
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
        ]
      },
      {
        path: 'submit',
        component: SubmitComponent,
        resolve: {
          submission: SubmissionResolver
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSubmitGuard,
          canActivateMarathonActiveGuard,
        ]
      },
      {
        path: 'submissions',
        component: SubmissionsComponent,
        resolve: {
          selection: SelectionResolver,
        }
      },
      {
        path: 'selection',
        component: SelectionComponent,
        resolve: {
          selection: SelectionResolver
        },
        data: {
          statuses: [],
          isAdminRoute: true,
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
          canActivateMarathonActiveGuard,
        ]
      },
      {
        path: 'schedule/:slug',
        component: ScheduleComponent,
        resolve: {
          schedule: ScheduleBySlugResolver,
        },
      },
      {
        path: 'schedule-management/overview',
        component: OverviewComponent,
        resolve: {
          schedules: ScheduleOverviewResolver,
        },
        data: {
          //
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
          canActivateMarathonActiveGuard,
        ]
      },
      {
        path: 'schedule-management/new',
        component: CreateComponent,
        resolve: {
          //
        },
        data: {
          //
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
          canActivateMarathonActiveGuard,
        ]
      },
      {
        path: 'schedule-management/:scheduleId',
        component: ScheduleManagementEditComponent,
        resolve: {
          scheduleInfo: ScheduleByIdResolver,
        },
        data: {
          withCustomData: true,
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
          canActivateMarathonActiveGuard,
        ]
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
        canActivate: [
          isEmailVerifiedGuardGuard,
          (route) => inject(CanActivateMarathonIncentivesGuard).canActivate(route)

        ]
      },
      {
        path: 'incentives/manage',
        component: IncentiveManagementComponent,
        resolve: {
          schedule: null,
          incentives: IncentivesResolver
        },
        data: {
          withLocked: true,
          withUnapproved: true
        },
        canActivate: [
          isEmailVerifiedGuardGuard,
          canActivateMarathonSettingsGuard,
          (route) => inject(CanActivateMarathonIncentivesGuard).canActivate(route),
          canActivateMarathonActiveGuard,
        ]
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
        canActivate: [
          isEmailVerifiedGuardGuard,
          CanActivateMarathonDonationsGuard,
          canActivateMarathonActiveGuard,
        ]
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
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(marathonRoutes),
    LocalizeRouterModule.forChild(marathonRoutes),
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NwbSwitchModule,
    DirectivesModule,
    FontAwesomeModule,
    NwbCommonModule,
    AutocompleteLibModule,
    OengusCommonModule,
    DragDropModule,
    NwbEditInPlaceModule,
    NwbPaginatorModule,
    ButtonsModule,
    ElementModule,
    ComponentsModule,
    DescriptionEditorComponent,
    ElementLoginLinkSelectorComponent,
    MarathonScheduleListComponent,
    RunDetailsComponent,
    ScheduleComponent,
    MarathonScheduleShareComponent,
    MarathonScheduleExportComponent,
    MarathonScheduleCurrentComponent,
    IncentiveComponent,
    DonationsComponent,
    SubmissionCategoryComponent,
    SubmissionGameComponent,
    SubmissionLazyLoaderComponent,
    SubmissionsComponent,
    NewMarathonComponent,
    SubmitShareButtonsComponent,
    SubmitHeaderComponent,
    SubmitMultiplayerJoinComponent,
    WarningModalComponent,
    OverviewComponent,
    CreateComponent,
    ClonePopupComponent,
    ImportRunDialogComponent,
    SubmissionsTableComponent,
    SubmissionRowComponent,
    ScheduleEditRowComponent,
    ScheduleTableOldElementComponent,
    SetupBlockEditorComponent,
    NormalRunEditorComponent,
    ScheduleTableComponent,
    GeneralSettingsComponent,
    DiscordSettingsComponent,
    IncentiveSettingsComponent,
    SubmissionSettingsComponent,
    SettingsComponent,
    DonateComponent,
    IncentiveManagementComponent,
    SelectionComponent,
    SubmitComponent,
    ScheduleManagementEditComponent,
  ],
  exports: [
    //
  ],
  providers: [
    CanActivateMarathonIncentivesGuard,
    CanActivateMarathonDonationsGuard,
    MarathonResolver,
    SubmissionResolver,
    ScheduleBySlugResolver,
    ScheduleByIdResolver,
    SelectionResolver,
    IncentivesResolver,
    AvailabilitiesResolver,
    ScheduleOverviewResolver,
    DonationsResolver,
    DonationsStatsResolver,
  ]
})
export class MarathonModule {
}
